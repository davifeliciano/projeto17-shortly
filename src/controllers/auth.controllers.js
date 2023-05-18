import bcrypt from "bcrypt";
import UsersRepository from "../repositories/users.repository.js";
import { signInUser } from "../services/auth.services.js";

export async function singUpController(req, res) {
  const { name, email, password } = res.locals.body;
  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  try {
    await UsersRepository.insert(name, email, passwordHash);
    return res.sendStatus(201);
  } catch (err) {
    if (err.constraint === "users_email_key") {
      return res.sendStatus(409);
    }

    console.error(err);
    return res.status(500).send(err);
  }
}

export async function signInController(req, res) {
  const { email, password } = res.locals.body;

  try {
    const token = await signInUser(email, password);
    return token !== null ? res.send({ token }) : res.sendStatus(401);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
