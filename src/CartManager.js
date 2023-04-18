import ProductManager from './ProductManager.js';

export default class CartManager extends ProductManager {

    addProductToCart = async (cid, pid) => {
        try {
            const data = await this.getProducts();
            const products = await JSON.parse(data);
            let cart = products.find((product) => product.id === cid);
            if (!cart) {
                throw new Error()
            };
            const findInCart = cart.arrayProducts.find(e => {
                if (e.pid === pid) {
                    e.quantity++
                    return 1
                };
            });
            if (findInCart === undefined) {
                const prod = { "pid": pid, "quantity": 1 }
                arrayProducts.push(prod)
            }
            await this.writeFile(JSON.stringify(products))

            return cid;
        } catch (e) {
            const myError = new Error(`El producto ${pid} no se pudo agregar al carrito ${cid}`);
            myError.details = { code: 404, message: `El producto ${pid} no se pudo agregar al carrito ${cid}` };
            throw myError
        };
    };

};