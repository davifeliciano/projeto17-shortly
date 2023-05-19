import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersRepository from "../repositories/users.repository.js";
import { SECRET_KEY } from "../constants/auth.constants.js";

export async function signInUser(email, password) {
  const user = await UsersRepository.findByEmail(email);

  if (user === null || !bcrypt.compareSync(password, user.passwordHash)) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    SECRET_KEY,
    { expiresIn: "1d" }
  );

  return token;
}
