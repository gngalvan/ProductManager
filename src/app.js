import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import productsRoute from './routes/products.route.js'
import cartsRoute from './routes/cart.route.js'
import viewsRouter from './routes/views.router.js';
import messagesRouter from './routes/messages.route.js';
import Products from './dao/dbManagers/productsDb.js';
import Messages from './dao/dbManagers/messagesDb.js';
import mongoose from 'mongoose';


const app = express();

const productManager = new Products();
const messageManager = new Messages();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products/', productsRoute);
app.use('/api/carts/', cartsRoute);
app.use('/chat', messagesRouter);
app.use('/', viewsRouter);

try {
    await mongoose.connect('mongodb+srv://gonzalongalvan2:2shxwfXi0Bbt1hF0@cluster0.l7roxtu.mongodb.net/');
} catch (error) {
    console.log(error);
}

const server = app.listen(8080, () => console.log("Listening on port 8080"));

export const io = new Server(server);

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado');

    socket.emit('products', await productManager.getAll());

    socket.on('addProduct', async (prod) => {
        await productManager.save(prod)
        socket.emit('rendProd', prod);
    });

    socket.on('deleteProduct', async (id) => {
        console.log(`Producto ID: ${id}`);
        await productManager.delete(id);
    });

    socket.on('messageAdded', async (message) => {
        await messageManager.save(message);
        socket.emit('addMessage', message);
    });
});