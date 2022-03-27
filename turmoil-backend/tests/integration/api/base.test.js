import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import createApp from '../../../src/app.js';

let app;

beforeAll(async () => {
  app = await createApp();
});

describe('The Base', () => {
  it('should return unsuccessful JSON response', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toStrictEqual({ });
  });
});
