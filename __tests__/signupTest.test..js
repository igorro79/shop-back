const { userSignupController } = require('../controllers/authController');
const gravatar = require('gravatar');
const { Users } = require('../services/schemas/users-schema');

const { register } = require('../services/users-services');

describe('signup controller test', () => {
  it('should contain token, object user with fields email and subscription(string)', async () => {
    const mReq = {
      body: {
        email: 'qwe@qwe.com',
        password: 'qweqwe',
        subscription: 'starter',
      },
    };
    const mRes = {};

    const fn = jest.mock('../services/users-services');

    const registred = {
      user: {
        email: 'qwe@qwe.com',
        subscription: 'starter',
      },
    };

    register.mockResolvedValue(registred);

    return userSignupController(mReq).then((registred) => {
      expect(registred.user.email).toEqual(mReq.email);
    });
    // const result = register.mockImplementation(() =>
    //   Promise.resolve(registred)
    // );
    // console.log(result);
    // expect(result.user.email).toEqual(mReq.email);
    // expect(result.user.subscription).toEqual(mReq.subscription);
  });
});
