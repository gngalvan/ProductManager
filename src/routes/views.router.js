import { Router } from 'express';
// import ProductManager from '../managers/ProductManager.js';
import Products from '../dao/dbManagers/productsDb.js';

const productManager = new Products();

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    try{
        const products = await productManager.getAll();
        res.render('home', {products});
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    await productManager.getAll();
    res.render('realTimeProducts');
});


export default viewsRouter;