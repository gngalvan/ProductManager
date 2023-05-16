import { productsModel } from "../models/products.model";

export default class Products {
    constructor() {
        console.log("Working products with DB");
    };
    getAll = async () => {
        const products = await productsModel.find().lean();
        return products;
    };
    save = async (product) => {
        const result = await productsModel.create(product);
        return result;
    };
    update = async (id, productUpd) => {
        const resultUpd = await productsModel.updateOne({_id: id}, {$set: productUpd});
        return resultUpd;
    };
    delete = async (id) => {
        const resultDel = await productsModel.deleteOne({_id: id});
        return resultDel;
    };
}