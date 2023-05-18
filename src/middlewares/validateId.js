import Joi from "joi";

export default function validateId(req, res, next) {
  const { id } = req.params;

  const idSchema = Joi.number().integer().positive().required();
  const { error, value } = idSchema.validate(id);

  if (error) {
    return res.status(404);
  }

  res.locals.id = value;
  next();
}
