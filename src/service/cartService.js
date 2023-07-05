import Carts from '../dao/dbManagers/carts.js';

const carts = new Carts();


const findCartById =  async (id) => {
    return await carts.findElementById(id);
}


const createCart = async () => {
    return await carts.save();
}


const addProdToCart = async (idCart, idProd,quantity) =>{
    return await carts.addProductToCart(idCart, idProd,quantity)
}

const updateProdQuantityInCart = async(idCart, pid,quantity) => {
    return await carts.updateQuantityProdInCart(idCart, pid,quantity);
}


const ClearCartById = async (idCart) => {
    return await carts.clearCart(idCart);
}

const deleteProdInCart = async (idCart,pid) => {
    return await carts.deleteProductByID(idCart,pid)
}

export {
    findCartById,createCart,addProdToCart,updateProdQuantityInCart,ClearCartById,deleteProdInCart
}