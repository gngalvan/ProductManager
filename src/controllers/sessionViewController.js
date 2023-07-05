const registrer =  async (req, res) => {
    res.render('register')
  
 }

 const login =   async (req, res) => {
    res.render('login')
 }


const logout =  async (req, res) => {
    res.render('profile',({
       user:req.user
    }))
 }

 export {
    registrer,login,logout
 }