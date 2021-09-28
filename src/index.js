require('dotenv').config();
const amqp = require('amqplib');
const SongsService = require('./services/postgres/SongsService');
const MailService = require('./services/mail/MailService');
const Listener = require('./helper/Listener');

const init = async () => {
  const songsService = new SongsService();
  const mailService = new MailService();
  const listener = new Listener(songsService, mailService);
  const queue = 'exports:playlist';

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, {
    durable: true,
  });

  channel.consume(queue, listener.listen, { noAck: true });
};

init();
