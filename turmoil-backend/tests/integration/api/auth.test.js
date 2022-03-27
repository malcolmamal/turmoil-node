import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { reset as resetDatabase } from '../../helpers/db-helper.js';
import { getAuthToken } from '../../helpers/request-helper.js';
import initializeSequelize from '../../../src/provider/db/sequelize.js';
import createApp from '../../../src/app.js';

describe('Authentication routes', () => {
  let app;
  let authorizeUser;

  beforeAll(async () => {
    app = await createApp();
    authorizeUser = async (opts) => await getAuthToken({ request: request(app), ...opts });
    await initializeSequelize();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  it('should lead to OK status', async () => {
    const response = await request(app)
      .get('/healthcheckNoAuth')
      .send();

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('Should return 400 bad request when email or password is missing', async () => {
    const response = await request(app).post('/user/create').send({});

    expect(response.body).toEqual({
      name: {
        errors: ['"name" is required'],
      },
      email: {
        errors: ['"email" is required'],
      },
      password: {
        errors: ['"password" is required'],
      },
    });
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 201 for newly created user', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        email: 'bbb@bbb.pl', password: 'noPassword', name: 'Ludwig',
      });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });

  it('Should return 403 if login was already used', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({
        email: 'aaa@aaa.pl', password: 'noPassword', name: 'Ludwig',
      });

    expect(response.statusCode).toBe(StatusCodes.FORBIDDEN);
  });

  it('Should return 200 and token for properly logged in user', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ email: 'aaa@aaa.pl', password: 'nopass' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userName');
  });

  it('should lead to no authorized error', async () => {
    const response = await request(app)
      .get('/healthcheck')
      .send();

    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('should lead to no authorized error for wrong credentials', async () => {
    const { token } = await authorizeUser({
      email: 'ludwig@no.pass',
      password: 'nopass',
    });
    const response = await request(app)
      .get('/healthcheck')
      .set({ Authorization: `Bearer ${token}` })
      .send();

    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('should reach secured endpoint for verified user', async () => {
    const { token } = await authorizeUser();

    const response = await request(app)
      .get('/healthcheck')
      .send()
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});
