/* eslint-disable global-require */
const getConfigField = require('../../utils/getConfigField');
const getRedisOptions = require('./getRedisOptions');
const isRedisUrl = require('./isRedisUrl');
let client = null;

const getClient = () => {
  const configClient = getConfigField('cacheClient')();

  // Set user- or package-configured cache service, if applicable.
  if (configClient) {
    client = configClient;
  }

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

  // We need to be explicit that redis is only imported when not executing
  // within a browser context, so that webpack can ignore this execution path
  // while compiling.
  if (! process.env.BROWSER) {
    let Redis;

    // Check if optional Redis client is installed.
    try {
      // eslint-disable-next-line global-require
      Redis = require('ioredis');
    } catch (err) {
      return null;
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
  }

  return client;
};

module.exports = getClient;