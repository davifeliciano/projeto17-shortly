import Joi from "joi";

const singUpSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.valid(Joi.ref("password")).messages({
    "any.only": '"confirmPassword" must be equal to "password"',
  }),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { singUpSchema, signInSchema };
