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

    addProductToCart = async (cartId, productId, quantity = 1) => {
        const cart = await cartsModel.findById(cartId);
        if (cart) {
            const productIndex = cart.products.findIndex(product => product.pid === productId);
            if (productIndex === -1) {
                const prod = {
                pid: productId,
                quantity: quantity
            };
            cart.products.push(prod);
            } else {
                cart.products[productIndex].quantity += quantity;
            }
            const response = await cart.save();
            return response;
        } else {
            console.log('Carrito inexistente:', cartId);
            return 'Carrito inexistente';
        };
    };

    removeProductFromCart = async (cartId, productId) => {
        const cart = await cartsModel.findById(cartId);
        if (cart) {
          const productIndex = cart.products.findIndex(
            (product) => product.pid === productId
          );
          if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            const response = await cart.save();
            return response;
          } else {
            console.log("Producto no encontrado en el carrito:", productId);
            return 'Producto no encontrado en el carrito';
          }
        } else {
          console.log("Carrito inexistente:", cartId);
          return 'Carrito inexistente';
        }
    };

    updateCart = async (cartId, products) => {
        const cart = await cartsModel.findById(cartId);
        if (cart) {
          cart.products = products;
          const response = await cart.save();
          return response;
        } else {
          console.log("Carrito inexistente:", cartId);
          return 'Carrito inexistente';
        }
    };

    updateProductQuantity = async (cartId, productId, quantity) => {
        const cart = await cartsModel.findById(cartId);
        if (cart) {
          const product = cart.products.find(
            (product) => product.pid === productId
          );
          if (product) {
            product.quantity = quantity;
            const response = await cart.save();
            return response;
          } else {
            console.log("Producto no encontrado en el carrito:", productId);
            return 'Producto no encontrado en el carrito';
          }
        } else {
          console.log("Carrito inexistente:", cartId);
          return 'Carrito inexistente';
        }
    };
      

    // update = async (id, product) => {
    //     const resultUpd = await cartsModel.updateOne({_id: id}, {$setproduct});
    //     return resultUpd;
    // };

    findCartById = async (cartId) => {
        const resultCart = await cartsModel.findById(cartId).populate('products').lean();
        return resultCart;
    };
    

    // delete = async (id) => {
    //     const resultDel = await cartsModel.deleteOne({_id: id});
    //     return resultDel;
    // };
}