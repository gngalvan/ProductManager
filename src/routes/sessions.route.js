import Router from './router.js';
import Users from "../dao/dbManagers/users.js";
import { registerUser,login,logout } from '../controllers/sessionsController.js';

const usersManager = new Users();


export default class SessionsRouter extends Router {
    init() {
        this.post("/register", ['PUBLIC'], registerUser);

        this.post("/login", ['PUBLIC'],login);

        this.get("/logout", ['USER', 'ADMIN'],logout);

    }

}