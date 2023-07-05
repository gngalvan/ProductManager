import mongoose from "mongoose";
import config from "../../config/config.js";

const URL = config.mongoUrl;

try{
await mongoose.connect(URL)
console.log("*Conectado a la DB Mongo*")
}catch(e){
    console.log(e)
}