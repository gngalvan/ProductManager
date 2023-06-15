import express from 'express';
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js';
import messagesRouter from './routes/messages.js'
import sessionsRouter from './routes/sessions.js';
import sessionViewsRouter from './routes/sessionsViews.js';
import handlebars  from 'express-handlebars';
import __dirname from './utils.js';
import {Server as HTTPServer} from 'http'
import {Server as SocketServer} from 'socket.io'
import FileManager from './dao/fileManagers/FileManager.js';
import Products from './dao/dbManagers/products.js';
import Messages from './dao/dbManagers/messages.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportInit from './config/passport.config.js';


const fileManager = new FileManager("./db/products.json");
const productsManager = new Products();
const messagesManager = new Messages();

const app = express();
const httpServer = new HTTPServer(app);
export const socketServer = new SocketServer(httpServer);
export  const io = socketServer; 

try{
  await mongoose.connect('mongodb+srv://mnmongodb:dbpass07@dbmongoazure.nrqqfgp.mongodb.net/ecommerce')
  }catch(error){
  console.log("error conecction db");
  }

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use('/products/realtimeproducts',express.static(`${__dirname}/public`));
app.use('/products/',express.static(`${__dirname}/public`));
app.use('/chats',express.static(`${__dirname}/public`));
app.use('/carts/',express.static(`${__dirname}/public`));


app.use(cookieParser())
passportInit();
app.use(passport.initialize());

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views` ); 
app.set('view engine',`handlebars` ); 


app.use('/products',productsRouter)
app.use('/carts',cartsRouter)
app.use('/chat',messagesRouter)
app.use('/api',sessionsRouter)
app.use('/',sessionViewsRouter)




socketServer.on('connection',async (socket) =>{
    console.log("socket conectado");

    socket.emit("SEND_PRODUCTS",await productsManager.getAll())

    socket.on("PRODUCT_ADDED",async(obj)=>{
        obj.thumbnails= [obj.thumbnails];
       const resultSave = await productsManager.save(obj)
         socketServer.sockets.emit("ADD_PRODUCT",resultSave)
      })

      socket.on("PRODUCT_DELETE",async(id)=>{
        await productsManager.delete(id);
        socketServer.sockets.emit("PRODUCT_DELETED",id)
      })


      socket.on("MESSAGE_ADDED",async(message)=>{

await messagesManager.save(message);
socketServer.sockets.emit("ADD_MESSAGE_CHAT",message)
      })
})

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT,()=>{
    console.log("Express Server listening on PORT 8080")
})  