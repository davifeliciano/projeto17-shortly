import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/auth.constants.js";

export default function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace(/bearer\s+/gi, "");

  try {
    const user = jwt.verify(token, SECRET_KEY);
    res.locals.user = user;
  } catch (err) {
    return res.sendStatus(401);
  }

  next();
}
