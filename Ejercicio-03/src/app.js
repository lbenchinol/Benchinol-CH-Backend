import ProductManager from './productManager.js';

import express from 'express';

const app = express();
const productManager = new ProductManager('./products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Inicio');
});

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    if (limit) {
        res.json(await productManager.getProducts(parseInt(limit)));
    } else {
        res.json(await productManager.getProducts());
    }
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productManager.getProductById(parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.send(`Error, el ID:${id} no se encontró.`);
    }
});

app.listen(8080, () => {
    console.log('Servidor iniciado.');
});