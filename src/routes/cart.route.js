import Router from './router.js';
import Carts from "../dao/dbManagers/carts.js";
import { findCart,createNewCart,addProductToCartById ,updateQuantityProdToCart,clearCartId,deleteProductToCartById} from '../controllers/cartsController.js';

const cartsManager = new Carts();

export default class CartsRouter extends Router {
    init() {

        this.get("/:id",['USER','ADMIN'], findCart);

        this.post("/",['USER','ADMIN'], createNewCart);

        this.post("/:id/products/:idprod",['USER','ADMIN'],addProductToCartById);

        this.put("/:id/update/products/:idprod",['USER','ADMIN'],updateQuantityProdToCart);

        this.delete("/:id",['USER','ADMIN'],clearCartId);

        this.delete("/:id/product/:pid",['USER','ADMIN'],deleteProductToCartById);
    }
}