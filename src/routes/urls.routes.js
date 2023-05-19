import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateBody from "../middlewares/validateBody.js";
import urlsSchema from "../schemas/urls.schema.js";
import validateId from "../middlewares/validateId.js";
import validateShortUrl from "../middlewares/validateShortUrl.js";
import {
  postController,
  openController,
  findByIdController,
  deleteController,
} from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.get("/urls/:id", validateId, findByIdController);
urlsRouter.get("/urls/open/:shortUrl", validateShortUrl, openController);
urlsRouter.delete("/urls/:id", validateToken, validateId, deleteController);

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateBody(urlsSchema),
  postController
);

export default urlsRouter;
