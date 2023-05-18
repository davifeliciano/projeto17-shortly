import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateBody from "../middlewares/validateBody.js";
import urlsSchema from "../schemas/urls.schema.js";
import {
  PostController,
  openController,
} from "../controllers/urls.controllers.js";
import validateShortUrl from "../middlewares/validateShortUrl.js";

const urlsRouter = Router();

urlsRouter.get("/urls/open/:shortUrl", validateShortUrl, openController);

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateBody(urlsSchema),
  PostController
);

export default urlsRouter;
