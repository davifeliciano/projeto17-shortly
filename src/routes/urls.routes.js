import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateBody from "../middlewares/validateBody.js";
import urlsSchema from "../schemas/urls.schema.js";
import { PostController } from "../controllers/urls.controllers.js";

const urlsRouter = Router();
urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateBody(urlsSchema),
  PostController
);

export default urlsRouter;
