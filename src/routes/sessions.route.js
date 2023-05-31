import { Router } from "express";
import Users from "../dao/dbManagers/users.js";
import __dirname from "../utils.js";

const sessionsRouter = Router();

const usersManager = new Users();

sessionsRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    const exist = await usersManager.findIfExist(email)

    if (exist)return res.status(400).send({
        status: "Error",
        error: "User already exist",
      });

    const user = {
      firstName,
      lastName,
      email,
      password
    };

 await usersManager.save(user)

    res.send({
      status: "Success",
      message: "User registered",
    });
  } catch (error) {
    console.log(error)
  }
});

sessionsRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersManager.LoginValidate(email,password);
    if (!user)
      return res.status(400).send({
        status: "Error",
        autorizated: false
      });

    req.session.user = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      age: user.age,
      isAdmin:user.isAdmin
    };

    res.send({
        status: "Success",
        autorizated: true
      });
  } catch (error) {console.log(error)}
});

sessionsRouter.get("/logout", async (req, res) => {
  let result;
  await req.session.destroy((err) => {
    if (err) {
      console.log("Error al destruir la sesión:", err);
      return res.status(400).send({
        status: "Error",
        logout: false
      });
    } else {
      console.log("Sesión destruida correctamente");
      return res.send({
        status: "Success",
        logout: true
      })
    }});

return  result
  });

export default sessionsRouter;