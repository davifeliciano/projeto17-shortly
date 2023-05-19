import { nanoid } from "nanoid";

const SECRET_KEY = process.env.SECRET_KEY || nanoid(128);

export { SECRET_KEY };
