const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const userValidationJoi = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
    password: Joi.string().required(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    next(new ValidationError(validate.error));
  }
  next();
};

const userSubscriptionValidationJoi = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().required().valid('starter', 'pro', 'business'),
  });
  const validate = schema.validate(req.body);
  if (validate.error) {
    next(new ValidationError(validate.error));
  }
  next();
};
module.exports = {
  userValidationJoi,
  userSubscriptionValidationJoi,
};
