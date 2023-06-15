import { Router } from 'express';
// import ProductManager from '../dao/fileManagers/ProductManager.js';
import Products from '../dao/dbManagers/productsDb.js';

const productsRouter = Router();

const manager = new Products();


// productsRouter.get('/', async (req, res) => {
//     const { limit = 10, page = 1, sort, ...query } = req.query;

//     const products = await manager.getAll(limit, page, sort, query);
//     console.table(products);

//     res.render('home', {products});
// });

import {
    Router
} from "express";
import Products from "../dao/dbManagers/products.js";
import addProductValidator from "../middlewares/addProductValidator.js";
import __dirname, { authToken } from '../utils.js';
import { privateAccess } from "../middlewares/accessValidator.js";
import passport from "passport";

const productsManager = new Products();


productsRouter.get("/",passport.authenticate('jwt',{session:false}), async (req, res) => {
const {limit, page,sort,title,price,category,status} = req.query;
const query = {}

if(title){
    query.title = title;
}
if(price){
    query.price = parseInt(price);
}
if(category){
    query.category = category;
}
if(status){
    query.status = status;
}

    
    const products = await productsManager.getAll(limit,page,query,sort) ;

    products.user = req.user;
    res.render('home',{products})
});

productsRouter.get("/product/:id", async (req, res) => {
    try{
        const id = req.params.id
const products = await productsManager.findElementById(id);
    res.send({status:'success',payload:products})
    }catch(error){
        res.status(400).send({status:'error',error})
    }
    
});


productsRouter.post("/", addProductValidator, async (req, res) => {
    try {
        const element = req.body;
        const products = await productsManager.save(element);
        if(products){
            res.send("Producto Agregado!");
        }
    } catch (error) {
        res.status(400).send().json({
            error: error
        });
    }
});


productsRouter.put("/:id",async (req, res) => {
    try {
        const element = req.body;
        const id = req.params.id
        const products = await productsManager.update(id,element);
        res.json({status:'success', payload: products});
             
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});

productsRouter.delete("/:id",async (req, res) => {
    try {
        const id = req.params.id
        const products = await productsManager.delete(id);
        res.json({status:'success', payload: products});
             
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});

productsRouter.get("/realtimeproducts", async (req, res) => {
    const products = await productsManager.getAll() ;
    
    res.render('realTimeProducts')
});


export default productsRouter;