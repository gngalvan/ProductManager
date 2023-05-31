import { Router } from "express";
import __dirname from "../utils.js";
import {publicAccess,privateAccess} from '../middlewares/accessValidator.js'

const sessionViewsRouter = Router();

sessionViewsRouter.get("/register",publicAccess, async (req, res) => {
   res.render('register')
 
});

sessionViewsRouter.get("/login", publicAccess, async (req, res) => {
     res.render('login')
  });


  sessionViewsRouter.get("/", privateAccess, async (req, res) => {
     res.render('profile',({
        user:req.session.user
     }))
  });


export default sessionViewsRouter;