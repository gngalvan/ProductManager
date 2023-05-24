import { Router } from "express";
// import CartManager from "../managers/CartManager.js";
import Carts from "../dao/dbManagers/cartsDb.js";

const cartRouter = Router();

const cartManager = new Carts();

// DELETE api/carts/:cid/products/:pid
cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const response = await cartManager.removeProductFromCart(cid, pid);
    res.json(response);
});

// PUT api/carts/:cid
cartRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const response = await cartManager.updateCart(cid, products);
    res.json(response);
});

// PUT api/carts/:cid/products/:pid
cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const response = await cartManager.updateProductQuantity(cid, pid, quantity);
    res.json(response);
});

cartRouter.post("/", async (req, res) => {
    try {
        const cart = await cartManager.save();
        res.send(`Carrito creado ID:${cart._id}`);
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});

// GET api/carts/:cid
cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.findCartById(cid);
    res.json(cart);
});

// cartRouter.get("/:cid", async (req, res) => {
//     try {
//         const cid = req.params.cid;
//         const cartProduct = await cartManager.findCartById(cid);
//         res.send({ status: 'success', payload: cartProduct}); 
//     } catch (error) {
//         res.status(500).send({ status: 'error', error});
//     };
// });

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
