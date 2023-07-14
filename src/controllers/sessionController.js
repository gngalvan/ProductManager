import {
    findUserExist,
    validateLogin,
    saveUser
} from '../service/sessionsServices.js';
import __dirname, {
    generateToken
} from "../utils.js";


const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const exist = await findUserExist(email)

        if (exist) return res.status(400).send({
            status: "Error",
            error: "User already exist",
        });

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
    } catch (error) {
        console.log(error)
    }
}


const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await validateLogin(email, password);
        if (!user)
            return res.status(400).send({
                status: "Error",
                autorizated: false
            });


        const accessToken = generateToken(user);

        res.cookie(
            'coderCookieToken', accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }
        ).send({
            status: 'success'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'error',
            error: error.message
        });
    }
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