import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import indexRouter from './routers/index.router.js';
import productRouter from './routers/product.router.js';
import cartRouter from './routers/cart.router.js';
import realTimeProductsRouter from './routers/realTimeProducts.router.js';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');

app.use('/', indexRouter, realTimeProductsRouter);
app.use('/api', productRouter, cartRouter);

app.use((error, req, res, next) => {
    const message = `Ha ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
});

export default app;