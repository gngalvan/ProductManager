import { Router } from "express";
import ProductManager from "../ProductManager.js";
import CartManager from "../CartManager.js";

const cartRouter = Router();

// const productManager = new ProductManager();
const cartManager = new CartManager("../../files/cart.json");

cartRouter.post("/", async (req, res) => {
    try {
        const cart = await cartManager.addCart();
        // cart.products = [];
        res.send(`Carrito creado ID:${cart}`);
    } catch (error) {
        res.send({ error: error.message });
    };
});

cartRouter.get("/:cid", async (req, res) => {
    try {
        const cid = Number(req.params.cid);
        const cartProduct = await cartManager.getCartById(cid);
        res.send(cartProduct);
    } catch (error) {
        res.send({ error: error.message });
    };
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = Number(req.params.cid);
        const pid = Number(req.params.pid);
        const cart = await cartManager.addProductToCart(cid,pid);
        res.send(`Producto agregado al carrito ID:${cart}`);
    } catch (error) {
        res.send({ error: error.message });
    };
});

export default cartRouter;
