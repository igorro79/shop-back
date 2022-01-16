const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const { Users } = require('../services/schemas/users-schema');
require('dotenv').config();

const gravatar = require('gravatar');
const { string } = require('joi');
const PORT = process.env.PORT || 3000;
const TEST_DB = process.env.TEST_DB;

describe('signup controller test', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(TEST_DB).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection('users').then(() => {
      mongoose.connection.close(() => done());
    });
  });

  it('should contain object user with 2 fields email and subscription(both string)', async () => {
    const email = 'qwe@qwe.com';
    const registerData = {
      email: 'qwe@qwe.com',
      password: 'qweqwe',
    };

    const response = await request(app)
      .post('/users/signup')
      .send(registerData);

    // check response
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
    expect(Object.keys(response.body.user).length).toBe(2);
  });
});
