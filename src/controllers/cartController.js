import { findCartById,createCart,addProdToCart,updateProdQuantityInCart,ClearCartById,deleteProdInCart } from "../service/cartsService.js";

const findCart = async (req, res) => {
    try {
        const contentType = req.headers['content-type'];
        const id = req.params.id
        const cart = await findCartById(id);
        if (contentType === 'application/json') {
            res.json(cart)
        } else {
            res.render('cart', {
                cart
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}


const createNewCart = async (req, res) => {
    try {
        const cart = await createCart();
        if (cart) {
            res.json({
                status: 'success',
                payload: cart._id
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}

const addProductToCartById =  async (req, res) => {
    try {
        const idProd = req.params.idprod;
        const id = req.params.id
        const quantity = req.body.quantity
        console.log(quantity)

        const cart = await addProdToCart(id, idProd, quantity);
        if (cart) {
            res.json({
                status: 'success',
                payload: cart
            });
        }

    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}

const updateQuantityProdToCart =  async (req, res) => {
    try {
        const idProd = req.params.idprod;
        const id = req.params.id
        const quantity = req.body.quantity;
        const cart = await updateProdQuantityInCart(id, idProd, quantity);
        if (cart) {
            res.json({
                status: 'success'
            })
        } else {
            res.json({
                status: 'failed'
            });
        }

    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}


const clearCartId =  async (req, res) => {
    try {
        const id = req.params.id
        const cart = await ClearCartById(id);
        if (cart) {
            res.json({
                status: 'success',
                payload: cart
            });
        } else {
            throw cart
        }
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}


const deleteProductToCartById =  async (req, res) => {
    try {
        const id = req.params.id
        const pid = req.params.pid
        const cart = await deleteProdInCart(id, pid);
        if (cart !== -1) {
            res.json({
                status: 'success',
                payload: cart
            });
        } else {
            throw cart
        }

    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}



export {
    findCart,createNewCart,addProductToCartById,updateQuantityProdToCart,clearCartId,deleteProductToCartById
}