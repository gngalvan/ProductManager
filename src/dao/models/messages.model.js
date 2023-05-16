import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

export const messagesModel = mongoose.model(messagesCollection, messagesSchema);