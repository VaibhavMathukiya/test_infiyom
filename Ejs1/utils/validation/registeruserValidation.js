const joi = require("joi");

const RegiUserSchema = joi.object({
  fristName: joi.string().empty().min(2).max(30).required().trim().messages({
    "string.empty": "fristName must be required",
    "string.min": "fristName should have a minimun lenght 2",
    "any.required": "fristName must be required",
  }),
  lastName: joi.string().empty().min(2).max(30).required().trim().messages({
    "string.empty": "lastName  must be required",
    "string.min": "lastName  should have a minimun lenght 2",
    "any.required": "lastName must be required",
  }),
  email: joi.string().empty().required().email().trim().messages({
    "string.empty": "email must be required",
    "any.required": " email must be required",
    "string.email": "invalid email address",
  }),
  password: joi.string().empty().min(6).required().trim().messages({
    "string.empty": "password must be required",
    "string.min": "password must be at least 6 charecters",
    "eny.required": "password must be required",
  }),
  phone: joi
    .string()
    .regex(/^[0-9]{10}$/)
    .allow(null)
    .allow("")
    .trim()
    .messages({
      "string.pattern.base": "Phone Number have must 10 digits",
    }),
});

module.exports = RegiUserSchema;
