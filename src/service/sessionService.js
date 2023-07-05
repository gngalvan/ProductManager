import Users from "../dao/dbManagers/users.js";

const users = new Users();

const findUserExist = async (emailUser) =>{
    return await users.findIfExist(emailUser);
}

const validateLogin = async (emailUser,passUser) =>{
    return await users.LoginValidate(emailUser,passUser);
}

const saveUser = async (user)=> {
    return await users.save(user);
}

const findUserByID = async (id) =>{
    return await users.findById(id);
}


export {
    findUserExist,
    validateLogin,
    saveUser,
    findUserByID
}