import { Injectable } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';
import { rabbitmqConstants } from 'src/config/constants';

@Injectable()
export class MessageBus {
  public async publish(msg: string) {
    try {
      const connection: Connection = await connect(rabbitmqConstants); // rabbitmqSettings

      // Create a channel
      const channel: Channel = await connection.createChannel();
      // Makes the queue available to the client
      const queue = 'user.queue';
      await channel.assertQueue(queue, { durable: false });

      const result = channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent message '%s' with status '%s'", msg, result);
      channel.close().then(() => {
        connection.close();
        console.log('[MessageBus] Closed');
      });
      console.log('[MessageBus] See ya');
    } catch (ex) {
      console.log(ex);
    }
  }

  public async consume() {
    try {
      const queue = 'user.queue';

      const connection: Connection = await connect(rabbitmqConstants);
      const channel = await connection.createChannel();
      channel.assertQueue(queue, { durable: false });

      console.log('[MessageBus] Waiting for messages.');

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
      console.log(ex);
    }
  }
}
