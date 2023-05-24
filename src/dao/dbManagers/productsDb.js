import { productsModel } from "../models/products.model.js";


export default class Products {
    constructor() {
        console.log("Working products with DB");
    };

    getAll = async (limit = 10, page = 1, query = '', sortValue) => {
        let filter = {};

        const options = {
            page,
            limit
        };

        if (sortValue) {
            if (sortValue === 'asc') {
                options.sort = {
                    price: 1
                };
            } else {
                options.sort = {
                    price: -1
                };
            };
        } else {
            options.sort = undefined;
        };

        if (query) {
            filter = {
                ...query
            };
        };

        const result = await productsModel.paginate(filter, options);
        const products = result.docs.map(doc => doc.toObject());

        return {
            products,
            pagination: {
              totalDocs: products.totalDocs,
              limit: products.limit,
              totalPages: products.totalPages,
              page: products.page,
              pagingCounter: products.pagingCounter,
              hasPrevPage: products.hasPrevPage,
              hasNextPage: products.hasNextPage,
              prevPage: products.prevPage,
              nextPage: products.nextPage
            }
        };
    };

    save = async (product) => {
        const result = await productsModel.create(product);
        return result;
    };
    findProductById = async (id) => {
        const resultCart = await productsModel.findById({_id: id}).lean()
        return resultCart;
    };
    update = async (id, productUpd) => {
        const resultUpd = await productsModel.updateOne({_id: id}, {$set: productUpd});
        return resultUpd;
    };
    delete = async (id) => {
        const resultDel = await productsModel.deleteOne({_id: id});
        return resultDel;
    };
}