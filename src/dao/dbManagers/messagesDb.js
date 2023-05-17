import { messagesModel } from "../models/messages.model.js";

export default class Messages {
    constructor() {
        console.log("Working messages with DB")
    };
    getAll = async () => {
        const messajes = await messagesModel.find().lean();
    };
    save = async (message) => {
        const send = await messagesModel.create(message);
    };
}