class BaseError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class WrongParametersError extends BaseError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class NotFound extends BaseError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class AuthError extends BaseError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class Conflict extends BaseError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  WrongParametersError,
  ValidationError,
  AuthError,
  BaseError,
  NotFound,
  Conflict,
};
