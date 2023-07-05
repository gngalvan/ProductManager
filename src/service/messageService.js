import Messages from "../dao/dbManagers/messages.js";

const messages = new Messages();

const saveNewMessage = async (msg) => {
    return await messages.save();
}

const getAllMessages = async () => {
    return await messages.getAll();
}


export {
    saveNewMessage,getAllMessages
}