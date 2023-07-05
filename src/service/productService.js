import Products from '../dao/dbManagers/products.js';

const products = new Products();

const getAllProducts = async (limit, page , query,sortValue) => {
return  await products.getAll(limit, page , query,sortValue);

}

const findProductById =  async (id) => {
    return await products.findElementById(id);
}


const addProduct = async (product) => {
    return await products.save(product);
}

const updateProductById = async(id,product) => {
    return await product.update(id,product);
}


const deleteProductById = async (id) => {
    return await products.delete(id);
}

export {
    getAllProducts,findProductById,addProduct,updateProductById,deleteProductById
}