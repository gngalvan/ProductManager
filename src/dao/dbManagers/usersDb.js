import { usersModel } from "../models/users.js";
import ManagerDb from "./managerDb.js";

export default class Users extends ManagerDb {
    constructor() {
        super(usersModel)
    }


    findIfExist = async (emailUser) => {
        const resultAll = await this.model.findOne({ email: emailUser }).lean();
        return resultAll
    }


    LoginValidate = async (emailUser, passUser) => {
        const resultAll = await this.model.findOne({ email: emailUser, password: passUser }).lean();
        if (resultAll) {
            return resultAll
        } else {
            return 0
        }
    }


}