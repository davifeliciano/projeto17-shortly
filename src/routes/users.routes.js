import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import {
  getRankingController,
  getStatsController,
} from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get("/users/me", validateToken, getStatsController);
usersRouter.get("/ranking", getRankingController);

export default usersRouter;
