import { Router } from "express";
import ProductManager from '../productManager.js';

const productManager = new ProductManager('./products.json');

const router = Router();

const products = await productManager.getProducts();

router.get('/', (req, res) => {
    res.render('index', { products, style: 'index.css' });
});

export default router;