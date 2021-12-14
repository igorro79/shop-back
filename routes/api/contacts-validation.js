const Joi = require('joi');

const validationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = {
  validationSchema,
};
