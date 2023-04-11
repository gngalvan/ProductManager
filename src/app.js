import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const manager = new ProductManager('../files/productos.json');

app.get('/products', async (req, res) => {
    const productsLlimit = Number(req.query.limit)
    const products = await manager.getProducts();
    console.table(products);
    if (productsLlimit) {
        res.send(products.slice(0, productsLlimit));
    } else {
        res.send(products);
    };
});

app.get('/products/:pid', async (req,res)=> {
    try {
        const productId = Number(req.params.pid)
        const product = await manager.getProductById(productId);
        res.send(product);
    } catch (error) {
        res.send({ error: error.message });
    }
})

app.listen(8080,()=>console.log("Listening on 8080"))