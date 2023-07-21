import Router from './router.js';
import { MockProducts } from '../utils.js';

export default class mockProductsRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], (req,res)=>{
            const products = MockProducts();
            res.sendSuccess({status:'success',payload:products})
        });
    }
}