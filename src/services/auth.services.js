import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersRepository from "../repositories/users.repository.js";

export async function signInUser(email, password) {
  const user = await UsersRepository.findByEmail(email);

  if (user === null || !bcrypt.compareSync(password, user.passwordHash)) {
    return null;
  }

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  return token;
}
