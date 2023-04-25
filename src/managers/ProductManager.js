import fs from 'fs';

const path = './files/productos.json'

export default class ProductManager {

  getProducts = async () => {
    try{
      if(fs.existsSync(path)){
        const data = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(data); 
        return products;
      } else {
        return [];
      };
    } catch (error) {
      console.log('Ha ocurrido un error', error);
    };
  };

  addProduct = async (product) => {
    try {
      const products = await this.getProducts();
      product.status = true;
      if (product.title && typeof product.title === 'string' 
      && product.description && typeof product.description === 'string' 
      && product.price && typeof product.price === 'number' 
      && product.code && typeof product.code === 'string' 
      && typeof product.status == 'boolean'
      && (product.status === true || product.status === false) 
      && product.stock && typeof product.stock === 'number' 
      && product.category && typeof product.category === 'string') {
        if (products.length === 0) {
          product.id = 1;
        } else {
          product.id = products[products.length - 1].id + 1;
        };
        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
        console.log('Producto agregado correctamente');
        return(product);
      } else {
        console.log('Por favor, ingrese todos los datos correspondientes.');
        return { error: 'Por favor, ingrese todos los datos correspondientes.'};
      };
    } catch (error) {
      console.log('Error al agregar el producto:', error);
      throw Error(`Error al agregar el producto: ${error.message}`);
    };
  };

  getProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);
      if (!product) {
        console.log('Producto no encontrado GPBI');
        product = error;
      };
      console.log('Producto encontrado:', product); 
      return(product);
    } catch (error) {
      console.log('Error al obtener el producto:', error);
      throw Error(`Error al obtener el producto:', ${error.message}`);
    };
  };

  updateProduct = async (id, updatedProduct) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        console.log('Producto no encontrado UP');
        throw Error('Producto no encontrado');
      };
      products[index] = {
        ...products[index],
        ...updatedProduct,
        id: products[index].id
      };      
      await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
      console.log('Producto actualizado correctamente');
    } catch (error) {
      console.log('Error al actualizar el producto:', error);
      throw Error(`Error al actualizar el producto: ${error.message}`);
    };
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        console.log('Producto no encontrado');
        throw Error('Producto no encontrado')
      };
      products.splice(index, 1);
      await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
      console.log('Producto eliminado correctamente');
    } catch (error) {
      console.log('Error al eliminar el producto:', error);
      throw Error(`Error al eliminar el producto: ${error.message}`);
    };
  };
};



