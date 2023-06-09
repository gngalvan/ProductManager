import { usersModel,comparePassword } from "../models/users.js";
import ManagerDb from "./managerDb.js";
import bcrypt from 'bcrypt';

export default class Users extends ManagerDb{
    constructor(){
    super(usersModel)
    }


    findIfExist = async (emailUser) => {
        const resultAll = await this.model.findOne({email:emailUser}).lean();
      return resultAll
      }


      LoginValidate = async (emailUser,passUser) => {
        const user = await this.model.findOne({email:emailUser}).lean();
        const resultCompare = await comparePassword(passUser,user.password)
        if(resultCompare){
          return user 
        }else{
          return 0
        }      
      }


       save = async (user) => {
        try {
          const hashedPassword = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
          const newUser = { ...user, password: hashedPassword };
          // Lógica para guardar el usuario en la base de datos
          this.model.create(newUser)
        } catch (error) {
          throw new Error('Error al crear el usuario');
        }
      };

 
}