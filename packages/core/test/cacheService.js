/**
 * Test redis database.
 */
/* eslint-disable max-len */
const mockRedisDatabase = {
  'components-endpoint:path=/&context=site': 'some data',
  'components-endpoint:path=/test-page&context=site&extra-parameter=1': 'more data',
  'components-endpoint:path=/test-page&context=site&extra-parameter=2': 'more data',
  'components-endpoint:path=/test-page&context=site&extra-parameter=3': 'more data',
};
/* eslint-enable max-len */

/**
 * Mocks the Redis cache service with an instance of ioredis-mock.
 */
const cacheService = () => {
  // eslint-disable-next-line global-require
  const Redis = require('ioredis-mock');

  const redis = new Redis({
    data: mockRedisDatabase,
  });

  return {
    client: redis,
    async get(key) {
      return JSON.parse(await this.client.get(key));
    },
    set(key, value) {
      return this.client.set(
        key,
        JSON.stringify(value),
        'EX',
        300
      );
    },
    del(key) {
      return this.client.del(key);
    },
  };
};

module.exports = cacheService;