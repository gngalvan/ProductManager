import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const productManager = new ProductManager('../../fies/productos.json');

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default viewsRouter;