import {
    Router
} from "express";
import Messages from "../dao/dbManagers/messages.js";
import { saveMessage,getAllMsg } from "../controllers/messagesController.js";
import __dirname from '../utils.js';


const messagesRouter = Router();

const messagesManager = new Messages();

messagesRouter.get("/", getAllMsg);



messagesRouter.post("/",saveMessage );



export default messagesRouter;