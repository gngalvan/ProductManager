import { Router } from 'express';
// import ProductManager from '../dao/fileManagers/ProductManager.js';
import Products from '../dao/dbManagers/productsDb.js';


const productsRouter = Router();

const manager = new Products();

// productsRouter.get('/', async (req, res) => {
//     const productsLlimit = Number(req.query.limit)
//     const products = await manager.getProducts();
//     console.table(products);
//     if (productsLlimit) {
//         res.send(products.slice(0, productsLlimit));
//     } else {
//         res.send(products);
//     };  
// });

productsRouter.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid
        const product = await manager.findProductById(productId);
        res.send({ status: 'success', payload: product});
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

productsRouter.post('/', async (req, res) => {
    const product = req.body;
    if(!product.title || !product.description || !product.price || !product.code || !product.status || !product.stock) {
        return res.status(400).send({ status: 'error', error: 'Incomplete values'})
    };
    try {
        const products = await manager.save(product);
        res.send({ status: 'success', payload: products});
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const update = req.body;
        const updatedProduct = await manager.update(productId, update);
        res.send({ status: 'success', payload: updatedProduct});  
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        await manager.delete(productId);
        res.send({ status: 'deleted'});  
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

export default productsRouter;


  