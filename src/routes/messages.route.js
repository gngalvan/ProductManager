import { Router } from "express";
import Messages from "../dao/dbManagers/messagesDb";


const messagesRouter = Router();

const messagesManager = new Messages();

messagesRouter.get("/", async (req, res) => {
    const messages = await messagesManager.getAll();
    res.render('chat', {messages})
});

messagesRouter.post("/", async (req, res) => {
    try {
        const message = req.body;
        const element = await messagesManager.save(message);
        if(element){
            res.send("¡Mensaje agregado!");
        };
       
    } catch (error) {
        res.status(500).send({ status: 'error', error});
    };
});