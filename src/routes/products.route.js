import { Router } from 'express';
// import ProductManager from '../dao/fileManagers/ProductManager.js';
import Products from '../dao/dbManagers/productsDb.js';
import { productsModel } from '../dao/models/products.model.js';

const productsRouter = Router();

const manager = new Products('../../files/productos.json');

productsRouter.get('/', async (req, res) => {
    try{
        const products = await manager.getAll();
        res.send({ status: 'success', payload: products});
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

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
        const productId = Number(req.params.pid)
        const product = await manager.getProductById(productId);
        res.send(product);
    } catch (error) {
        res.send({ error: error.message });
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

// productsRouter.post('/', async (req, res) => {
//     try {
//         const io = req.app.get('socketio');
//         const product = req.body;
//         const pushedProduct = await manager.addProduct(product);
//         io.emit('getProducts', )
//         res.send({status: pushedProduct});
//     } catch (error) {
//         res.send({error: error.message});
//         console.log('Error al agregar el producto:', error);
//     };
// });

productsRouter.put('/:pid', async (req, res) => {
    try {
        const productId = Number(req.params.pid)
        const update = req.body;
        const updatedProduct = await manager.update(productId, update);
        res.send({ status: 'success', payload: updatedProduct});  
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

// productsRouter.put('/:pid', async (req, res) => {
//     try {
//         const productId = Number(req.params.pid)
//         const update = req.body;
//         const updatedProduct = await manager.updateProduct(productId, update);
//         res.send({ status:'Actualizado', updatedProduct});     
//     } catch (error) {
//         res.send({ error: error.message });
//     };
// });

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = Number(req.params.pid);
        await manager.deleteProduct(productId);
        res.send({ status: 'Eliminado', id: productId});
    } catch (error) {
        res.send({ error: error.message});
    };
});

// productsRouter.delete('/:pid', async (req, res) => {
//     try {
//         const productId = Number(req.params.pid);
//         await manager.deleteProduct(productId);
//         res.send({ status: 'Eliminado', id: productId});
//     } catch (error) {
//         res.send({ error: error.message});
//     };
// });

productsRouter.get("/realtimeproducts", async (req, res) => {
    const products = await productsManager.getAll() ;
    res.render('realTimeProducts')
});

export default productsRouter;


  