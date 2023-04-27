import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import productsRoute from './routes/products.route.js'
import cartsRoute from './routes/cart.route.js'
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';


const app = express();

const productManager = new ProductManager();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products/', productsRoute);
app.use('/api/carts/', cartsRoute);
app.use('/', viewsRouter);

const server = app.listen(8080, () => console.log("Listening on port 8080"));

export const io = new Server(server);

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado');

    socket.emit('products', await productManager.getProducts());

    socket.on('addProd', async (prod) => {
        prod.thumbnails = [prod.thumbnails];
        await productManager.addProduct(prod)
        socket.emit('rendProd', prod);
    });
});
