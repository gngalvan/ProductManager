import {
    findUserExist,
    validateLogin,
    saveUser
} from '../service/sessionsServices.js';
import __dirname, {
    generateToken
} from "../utils.js";
import CustomError from '../middlewares/errors/customErrors.js';
import { generateUserExistError } from '../middlewares/errors/info.js';
import EnumsErrors from '../middlewares/errors/enums.js';

const registerUser = async (req, res) => {

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const exist = await findUserExist(email)
let error;
        if (!exist) {
            const user = {
                firstName,
                lastName,
                email,
                password
            };
    
            const userGenerated = await saveUser(user)
            user.role=userGenerated.role;
            const accessToken = generateToken(user);
            res.cookie(
                'coderCookieToken', accessToken, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true
                }
            ).send({
                status: 'success'
            });
            }
            error =   new CustomError(
                'User already exist',
                   await generateUserExistError(email),
             'user Exist',
                 EnumsErrors.USER_EXIST
             )
 
        throw error
      
    
}


const login = async (req, res) => {

        let error;
        const {
            email,
            password
        } = req.body;

        const user = await validateLogin(email, password);
        if (!user){
            error =   new CustomError(
                'User or Password invalid',
                  'retry with another username or password',
             'Invalid Credentials',
                 EnumsErrors.INVALID_CREDENTIALS)
        throw error
        }


        const accessToken = generateToken(user);

        res.cookie(
            'coderCookieToken', accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }
        ).send({
            status: 'success'
        });

}


const logout = async (req, res) => {
    res.clearCookie('coderCookieToken').send({
        status: 'Success'
    });
}


export {
    registerUser,
    login,
    logout
}   