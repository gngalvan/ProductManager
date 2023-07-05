import Router from './router.js';
import Products from "../dao/dbManagers/products.js";
import addProductValidator from "../middlewares/addProductValidator.js";
import {
    getProducts,
    findProduct,
    addNewProduct,
    updateProduct,
    deleteProduct,
    renderProductsRealTime
} from '../controllers/productsController.js';
const productsManager = new Products();


export default class ProductsRouter extends Router {
    init() {
        this.get('/', ['USER', 'ADMIN'], getProducts);

        this.get("/product/:id", ['USER', 'ADMIN'], findProduct);

        this.post("/", ['ADMIN'], addProductValidator, addNewProduct);

        this.put("/:id", ['ADMIN'], updateProduct);

        this.delete("/:id", deleteProduct);

        this.get("/realtimeproducts", renderProductsRealTime);

    }


}