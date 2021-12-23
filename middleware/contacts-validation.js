const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const contactValidationJoi = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    // .pattern(/^w+(?:s+w+)*$/),

    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
    phone: Joi.string()
      // .length(10)
      // .pattern(/^[0-9]+$/)
      .required(),
    favorite: Joi.boolean().optional(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    next(new ValidationError(validate.error));
  }
  next();
};

const patchFavoriteValidationJoi = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    next(new ValidationError(validate.error));
  }
  next();
};
module.exports = {
  contactValidationJoi,
  patchFavoriteValidationJoi,
};
