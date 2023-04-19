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

    getCartById = async (id) => {
        try {
            const data = await fs.promises.readFile(path, 'utf-8');
            const carts = JSON.parse(data);
            const cart = carts.find((cart) => cart.id === id);    
            if (!cart) {
                console.log('Carrito no encontrado');
                return({error: "Carrito no encontrado"});
            };
            console.log('Carrito encontrado:', cart); 
            return(cart);
        } catch (error) {
          console.log('Error al obtener el carrito:', error);
        };
    };

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await this.getCartById(cid);
            const productIndex = cart.products.findIndex(e => e.pid === pid);
            if (productIndex === -1) {
                const prod = { "pid": pid, "quantity": 1 };
                cart.products.push(prod);
            } else {
                cart.products[productIndex].quantity++;
            };
            await this.writeFile(JSON.stringify(cart))
            return cid;
        } catch (e) {
            const myError = new Error(`El producto ${pid} no se pudo agregar al carrito ${cid}`);
            myError.details = { code: 404, message: `El producto ${pid} no se pudo agregar al carrito ${cid}` };
            throw myError
        };
    };
};