const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const products = await getJSON(this.path);
        let { title, description, price, thumbnail, code, stock } = product;
        title = title.trim();
        description = description.trim();
        thumbnail = thumbnail.trim();
        code = code.trim();

        if (title == "" || description == "" || price < 0 || thumbnail == "" || code == "" || stock < 0) {
            console.log('Ingrese los valores correctamente');
        } else {
            if (products.find(p => p.code === code)) {
                console.log(`Error, el campo code (${code}) del producto "${title}" ya se encuentra en el listado de productos`);
            } else {
                let counter = 1;
                let condition = true;
                do {
                    if (products.find(p => p.id === counter)) {
                        counter++;
                    } else {
                        condition = false;
                    }
                } while (condition);
                products.push({
                    id: counter, ...product,
                });
                console.log(`Producto "${title}" agregado correctamente`);
            }
        }
        await saveJSON(this.path, products);
    }

    async updateProduct(id, key, newValue) {
        const products = await getJSON(this.path);
        if (this.getProductById(id)) {
            const newProducts = products.map((p) => {
                if (p.id === id) {
                    p[key] = newValue;
                    return p;
                } else {
                    return p;
                }
            });
            await saveJSON(this.path, newProducts);
            console.log(`El ID:${id} se actualizó correctamente.`);
        }
    }

    async deleteProduct(id) {
        const products = await getJSON(this.path);
        if (this.getProductById(id)) {
            const newProducts = products.map(p => p.id !== id);
            await saveJSON(this.path, newProducts);
            console.log(`El ID:${id} se borró correctamente.`);
        }
    }

    async getProducts() {
        console.log(await getJSON(this.path));
        return await getJSON(this.path);
    }

    async getProductById(id) {
        const products = await getJSON(this.path);
        const productFound = products.find(p => p.id === id);
        if (productFound === undefined) {
            console.log(`Error, el ID:${id} no se encontró en el listado de productos`);
            return false;
        } else {
            console.log(productFound);
            return productFound;
        }
    }
}

const existFile = async (path) => {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        return false;
    }
}

const getJSON = async (path) => {
    if (!await existFile(path)) {
        return [];
    }
    let content;
    try {
        content = await fs.promises.readFile(path, 'utf-8');
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser leido.`);
    }
    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    }
}

const saveJSON = async (path, data) => {
    const content = JSON.stringify(data, null, '\t');
    try {
        await fs.promises.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser guardado correctamente.`);
    }
}

(async () => {
    const productManager = new ProductManager('./products.json');
    console.log(`Productos: `);
    await productManager.getProducts();
    await productManager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    });

    console.log(`Productos: `);
    await productManager.getProducts();

    console.log(`Producto por ID 5:`);
    await productManager.getProductById(5);

    console.log(`Producto por ID 1:`);
    await productManager.getProductById(1);

    await productManager.updateProduct(1, 'title', 'titulo actualizado');

    console.log(`Productos: `);
    await productManager.getProducts();

    await productManager.deleteProduct(1);

    console.log(`Productos: `);
    await productManager.getProducts();

    await productManager.deleteProduct(1);

})();