import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "GonzaloGalvan";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "30 minutes" });
  return token;
};

export const authToken = (req, res, next) => {
  const { authToken } = req.headers.Authorization;

  if (!authToken) return res.status(401).send({ error: "Not authenticated" });

  const token = authToken.split(" ")[1];

  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: "Not Autorized" });

    req.user = credentials.user;
    next();
  });
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error al comparar las contraseñas");
  }
};

export const createPasswordHash = (password) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
};

export default __dirname;