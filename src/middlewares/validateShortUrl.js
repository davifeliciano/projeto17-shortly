import Joi from "joi";
import { MAX_URL_SIZE, MIN_URL_SIZE } from "../constants/urls.constants.js";

export default function validateShortUrl(req, res, next) {
  const { shortUrl } = req.params;

  const shortUrlSchema = Joi.string()
    .min(MIN_URL_SIZE)
    .max(MAX_URL_SIZE)
    .pattern(/^\w+$/);

  const { value, error } = shortUrlSchema.validate(shortUrl);

  if (error) {
    return res.sendStatus(404);
  }

  res.locals.shortUrl = value;
  next();
}
