import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager();

let productos = await manager.getProducts();

// console.log(productos);

// await manager.addProduct({
//   title: 'producto prueba',
//   description: 'Este es un producto prueba',
//   price: 200,
//   thumbnail: 'Sin imagen',
//   code: 'abc123',
//   stock: 25,
// });

// console.log(productos);

// await manager.getProductById(2);


await manager.updateProduct(1, {
  title: 'Producto de prueba actualizado2',
  description: 'Este es un producto de prueba actualizado',
  price: 250,
  thumbnail: 'Imagen actualizada',
  code: 'abc123',
  stock: 20,
});


await manager.deleteProduct(1);
console.log(productos);
// await manager.getProducts();