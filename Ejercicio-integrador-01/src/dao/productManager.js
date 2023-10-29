import ProductModel from '../models/product.model.js';
import { Exception } from '../utils.js';

export default class ProductManager {
    static async addProduct(product) {
        const products = await ProductModel.find();

        let { title, description, price, thumbnail, code, stock, category, status } = product;

        title !== "" ? title.trim() : title;
        description !== "" ? description.trim() : description;
        thumbnail !== "" ? thumbnail.trim() : thumbnail;
        code !== "" ? code.trim() : code;
        category !== "" ? category.trim() : category;
        status = true;

        const newProduct = { title, description, price, thumbnail, code, stock, category, status };

        if (title == "" || description == "" || price < 0 || code == "" || stock < 0 || category == "") {
            throw new Exception('Ingrese los valores correctamente', 400);
        } else {
            if (products.find(p => p.code === code)) {
                throw new Exception(`Error, el campo code (${code}) ya se encuentra en el listado de productos`, 400);
            } else {
                await ProductModel.create(newProduct);
                return newProduct;
            }
        }
    }

    static async updateProduct(id, productUpdated) {
        const { title, description, price, thumbnail, code, stock, category, status } = productUpdated;

        title !== "" ? title.trim() : title;
        description !== "" ? description.trim() : description;
        thumbnail !== "" ? thumbnail.trim() : thumbnail;
        code !== "" ? code.trim() : code;
        category !== "" ? category.trim() : category;

        if (title == "" || description == "" || price < 0 || code == "" || stock < 0 || category == "") {
            throw new Exception('Ingrese los valores correctamente', 400);
        }

        const newProduct = { title, description, price, thumbnail, code, stock, category, status };

        const product = await ProductModel.findById(id);

        if (!product) {
            throw new Exception(`Error, el ID:${id} no se encontró en el listado de productos`, 404);
        } else {
            const filter = { _id: id };
            const operation = { $set: newProduct };
            await ProductModel.updateOne(filter, operation);
        }
    }

    static async deleteProduct(id) {
        if (!await ProductModel.findById(id)) {
            throw new Exception(`Error, el ID:${id} no se encontró en el listado de productos`, 404);
        } else {
            const filter = { _id: id };
            await ProductModel.deleteOne(filter);
        }
    }

    static getProducts(query = {}) {
        const filter = {};
        return ProductModel.find(filter).limit(query);
    }

    static async getProductById(id) {
        const product = await ProductModel.findById(id);
        if (!product) {
            throw new Exception(`Error, el ID:${id} no se encontró en el listado de productos`, 404);
        } else {
            return product;
        }
    }
}