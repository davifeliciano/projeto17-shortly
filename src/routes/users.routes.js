import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { getStatsController } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get("/users/me", validateToken, getStatsController);

export default usersRouter;
