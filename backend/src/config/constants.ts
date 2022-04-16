import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const jwtConstants = {
  secret: 'secretKey',
};

export const databaseConstants: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'nopass',
  database: 'turmoil',
};

export const rabbitmqConstants = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'rabbit',
  password: 'nopass',
  vhost: '/',
  authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL'],
};
