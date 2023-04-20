import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const productsRouter = Router();

const manager = new ProductManager('../../src/productos.json');

productsRouter.get('/', async (req, res) => {
    const productsLlimit = Number(req.query.limit)
    const products = await manager.getProducts();
    console.table(products);
    if (productsLlimit) {
        res.send(products.slice(0, productsLlimit));
    } else {
        res.send(products);
    };  
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const productId = Number(req.params.pid)
        const product = await manager.getProductById(productId);
        res.send(product);
    } catch (error) {
        res.send({ error: error.message });
    };
});

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body;
        const pushedProduct = await manager.addProduct(product);
        res.send({status: pushedProduct});
    } catch (error) {
        res.send({error: error.message});
        console.log('Error al agregar el producto:', error);
    };
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        const productId = Number(req.params.pid)
        const update = req.body;
        const updatedProduct = await manager.updateProduct(productId, update);
        res.send({ status:'Actualizado', updatedProduct});     
    } catch (error) {
        res.send({ error: error.message });
    };
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = Number(req.params.pid);
        await manager.deleteProduct(productId);
        res.send({ status: 'Eliminado', id: productId});
    } catch (error) {
        res.send({ error: error.message});
    };
});

export default productsRouter;


  