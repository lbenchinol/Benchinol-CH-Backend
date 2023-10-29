import { Server } from 'socket.io';

import ProductManager from './dao/productManager.js';

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {
        console.log(`Nuevo cliente conectado (${socketClient.id})`);

        const products = await ProductManager.getProducts();

        socketClient.emit('products-list-updated', { products });

        socketClient.on('disconnect', () => {
            console.log(`Se ha desconectado el cliente (${socketClient.id})`);
        });
    });
}

export const emitFromApi = (event, data) => io.emit(event, data);