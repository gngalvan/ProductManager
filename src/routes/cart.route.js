import { Router } from "express";
// import CartManager from "../managers/CartManager.js";
import Carts from "../dao/dbManagers/cartsDb.js";

const cartRouter = Router();

const cartManager = new Carts();

cartRouter.post("/", async (req, res) => {
    try {
        const cart = await cartManager.save();
        res.send(`Carrito creado ID:${cart._id}`);
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

cartRouter.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const cartProduct = await cartManager.findCartById(cid);
        res.send({ status: 'success', payload: cartProduct}); 
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await cartManager.addProductToCart(cid, pid);
        res.send(`Producto agregado al carrito ID:${cid}`);
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

export default cartRouter;
