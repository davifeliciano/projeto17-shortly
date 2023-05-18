import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { signInSchema, singUpSchema } from "../schemas/auth.schema.js";
import {
  signInController,
  singUpController,
} from "../controllers/auth.controllers.js";

const authRouter = Router();
authRouter.post("/signup", validateBody(singUpSchema), singUpController);
authRouter.post("/signin", validateBody(signInSchema), signInController);

export default authRouter;
