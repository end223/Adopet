const Redis = require('ioredis');
require('dotenv').config();

const redisClient = new Redis({
  sentinels: [
    {
      host: 'oregon-redis.render.com',
      port: 6379,
    },
  ],
  name: 'red-ckkugtav7m0s73cruim0',
  password: 'QZj2QpxfG6edSSsI9iE9KeY5bmtRmk3R',
  tls: {},
});


module.exports = redisClient;
