/* eslint-disable global-require */
const getRedisOptions = require('./getRedisOptions');
let client = require('./defaultClient');
const isRedisUrl = require('./isRedisUrl');

const getClient = () => {
  if (client) {
    return client;
  }

  const retryStrategy = (times) => (
    // Wait 2 seconds maximum before attempting reconnection
    Math.min(times * 50, 2000)
  );
  const [host, port, password] = getRedisOptions();

  // Redis env variables have not been configured.
  if (
    ! isRedisUrl(host) &&
    (! host || ! port) &&
    'test' !== process.env.BABEL_ENV
  ) {
    return client;
  }

  let Redis;

  // Check if optional Redis client is installed.
  try {
    // eslint-disable-next-line global-require
    Redis = require('ioredis');
  } catch (err) {
    return client;
  }

  const opts = {
    retryStrategy,
    enableOfflineQueue: true,
    maxRetriesPerRequest: process.env.QUEUED_CONNECTION_ATTEMPTS,
  };

  if (isRedisUrl(host)) {
    client = new Redis(host, opts);
  } else {
    client = new Redis({
      host,
      port,
      password,
      ...opts,
    });
  }

  client.on('error', (err) => {
    console.error(err); // eslint-disable-line no-console
  });

  return client;
};

module.exports = getClient;