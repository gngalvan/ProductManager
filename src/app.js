import express from 'express';
import productsRoute from './routes/products.route.js'
import cartsRoute from './routes/cart.route.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products/', productsRoute);
app.use('/api/carts/', cartsRoute);


app.listen(8080,()=>console.log("Listening on 8080"))