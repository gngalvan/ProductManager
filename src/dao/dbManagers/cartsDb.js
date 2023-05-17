import { cartsModel } from "../models/carts.model.js";

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

    addProductToCart = async (cartId, productId) => {
        const cart = await cartsModel.findById({_id: cartId});
        if (cart) {
            const productIndex = cart.products.findIndex(e => e.productId === productId);
            if (productIndex === -1) {
                const prod = { "pid": productId, "quantity": 1};
                cart.products.push(prod);
            } else {
                cart.products[productIndex].quantity++;
            };
        } else {
            return 'Carrito inexistente'
        };
        await cart.save();
        return cartId;
    };

    update = async (id, product) => {
        const resultUpd = await cartsModel.update({_id: id}, {$setproduct});
        return resultUpd;
    };

    findCartById = async (cartId) => {
        const resultCart = await cartsModel.findById({_id: cartId}).lean()
        return resultCart;
    };

    delete = async (id) => {
        const resultDel = await cartsModel.deleteOne({_id: id});
        return resultDel;
    };
}