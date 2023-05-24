import { Router } from 'express';
import Products from '../dao/dbManagers/productsDb.js';
import { productsModel } from '../dao/models/products.model.js';

const productManager = new Products();

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, ...query } = req.query;
    const { products, pagination } = await productManager.getAll(limit, page, sort, query);
    console.table(products);
    res.render('home', {products, pagination});
});


viewsRouter.get("/realtimeproducts", async (req, res) => {
    await productManager.getAll();
    res.render('realTimeProducts');
});


export default viewsRouter;