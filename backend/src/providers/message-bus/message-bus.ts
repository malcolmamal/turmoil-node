import { Injectable } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

const rabbitmqSettings = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'rabbit',
  password: 'nopass',
  vhost: '/',
  authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL'],
};

@Injectable()
export class MessageBus {
  public async publish(msg: string) {
    try {
      const connection: Connection = await connect(rabbitmqSettings); // rabbitmqSettings

      // const connection: Connection = await connect(
      //   'amqp://rabbit:nopass@localhost:5672',
      // );

      // Create a channel
      const channel: Channel = await connection.createChannel();
      // Makes the queue available to the client
      const queue = 'hello';
      await channel.assertQueue(queue, { durable: false });

      const result = channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent message '%s' with status '%s'", msg, result);
      channel.close().then(() => {
        connection.close();
        console.log('closed');
      });
      console.log('see ya');
    } catch (ex) {
      console.log('exception!!');
      console.log(ex);
    }
  }

  public async consume() {
    try {
      const queue = 'hello';

      const connection: Connection = await connect(rabbitmqSettings);
      const channel = await connection.createChannel();
      channel.assertQueue(queue, { durable: false });

      console.log('waiting for messages');

      channel.consume(queue, async (msg) => {
        try {
          console.log(" [x] Received '%s'", msg.content.toString());
          channel.ack(msg);
        } catch (err) {
          console.log(
            'failed processing message, nacking',
            msg.content.toString(),
          );
          channel.nack(msg, false, false);
        }
      });
    } catch (ex) {
      console.log('exception');
      console.log(ex);
    }
  }
}
