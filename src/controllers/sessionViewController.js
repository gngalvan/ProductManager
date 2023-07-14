import userDTO from "../dao/DTOs/users.dto.js"

const registrer =  async (req, res) => {
    res.render('register')
  
 }

 const login =   async (req, res) => {
    res.render('login')
 }


const profile =  async (req, res) => {
   const reqUser = req.user
   const userProfile = new userDTO(reqUser)
    res.render('profile',({
       user:userProfile
    }))
 }

 export {
    registrer,login,profile
 }