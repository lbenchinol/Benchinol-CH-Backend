import { Router } from "express";

import ProductManager from '../../dao/productManager.js';

const router = Router();

router.get('/', async (req, res) => {
    const products = await ProductManager.getProducts();
    res.render('index', { products, style: 'index.css' });
});

export default router;