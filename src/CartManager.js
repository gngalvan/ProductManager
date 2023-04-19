import fs from 'fs';
import ProductManager from './ProductManager.js';

const path = './files/cart.json'

export default class CartManager extends ProductManager {

    addCart = async () => {
        try{
            if(fs.existsSync(path)){
                const data = await fs.promises.readFile(path, 'utf-8');
                const carts = JSON.parse(data);
                const cart = {
                    products: []
                }    
                if (carts.length === 0) {
                    cart.id = 1;
                } else {
                    cart.id = carts[carts.length - 1].id + 1;
                };
                carts.push(cart);
                await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
                console.log('Carrito agregado correctamente');          
            };   
        } catch (error) {
            console.log('Error al agregar el carrito:', error);
        };
    };

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