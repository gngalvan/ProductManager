import { cartsModel } from "../models/carts.model";

export default class Carts {
    constructor() {
        console.log("Working carts with DB");
    };

    getAll = async () => {
        const carts = await cartsModel.find().lean();
        return carts;
    };

    save = async (carts) => {
        const result = await cartsModel.create(carts);
        return result;
    };

    addProductToCart = async (cartId, productId) =>{
        const cart = await cartsModel.findById({_id:cartId});
        cart.products.push(productId)
        const response = cart.save()
        return response;
    };

    update = async (id, product) => {
        const resultUpd = await cartsModel.update({_id:id}, {$set:product});
        return resultUpd;
    };

    findCartById = async (cartId) => {
        const resultCart = await cartsModel.findById({_id:cartId}).lean()
        return resultCart;
    };

    delete = async (id) => {
        const resultDel = await cartsModel.deleteOne({_id: id});
        return resultDel;
    };
}