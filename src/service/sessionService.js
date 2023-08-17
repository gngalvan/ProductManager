import userDTO from "../dao/DTOs/users.dto.js";
import {sessionsRepository} from "../repositories/index.js";


const findUserExist = async (emailUser) =>{
    return await sessionsRepository.findUserExist(emailUser);
}

const validateLogin = async (emailUser,passUser) =>{
    return await sessionsRepository.validateLogin(emailUser,passUser);
}

const saveUser = async (user)=> {
    return await sessionsRepository.saveUser(user);
}

const findUserByID = async (id) =>{
    return await sessionsRepository.findUserByID(id);
}

const listUsers = async() =>{
const listUsers = [];
    const users = await sessionsRepository.listUsers()

    for (const user of users) {
        const dtoUSer = new userDTO(user)
        listUsers.push(await dtoUSer.getUser())
    };

    return listUsers
}


export {
    findUserExist,
    validateLogin,
    saveUser,
    findUserByID,
    listUsers

}