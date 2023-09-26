class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        let { title, description, price, thumbnail, code, stock } = product;
        title = title.trim();
        description = description.trim();
        thumbnail = thumbnail.trim();
        code = code.trim();

        if (title == "" || description == "" || price < 0 || thumbnail == "" || code == "" || stock < 0) {
            console.log('Ingrese los valores correctamente');
        } else {
            if (this.products.find(p => p.code === code)) {
                console.log(`Error, el campo code (${code}) del producto "${title}" ya se encuentra en el listado de productos`);
            } else {
                this.products.push({
                    id: this.products.length + 1,
                    ...product,
                })
                console.log(`Producto "${title}" agregado correctamente`);
            }
        }

    }

    getProducts() {
        console.table(this.products);
        return this.products;
    }

    getProductById(id) {
        const productFound = this.products.find(p => p.id === id);
        if (productFound === undefined) {
            console.log(`Error, el ID:${id} no se encontro en el listado de productos`);
        } else {
            console.table(productFound);
            return productFound;
        }
    }
}

const productManager = new ProductManager();

productManager.getProducts();

productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});

productManager.getProducts();

productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});

console.log('Producto por ID 5:');
productManager.getProductById(5);

console.log('Producto por ID 1:');
productManager.getProductById(1);