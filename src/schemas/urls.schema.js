import Joi from "joi";

const urlsSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: /https?/ })
    .required(),
});

export default urlsSchema;
