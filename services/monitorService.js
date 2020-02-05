const defaultService = {
  start: () => {},
  logError: () => {},
  logTransaction: () => {},
};

/**
 * Get the reusable monitor service instance. This service implements basic
 * application monitoring. It currently relies on newrelic, but the interface
 * is simple enough to be used with other underlying services if necessary.
 *
 * @returns {object} singleton service object
 */
const getService = () => {
  // newrelic cannot be imported in a browser environment.
  if (! process.env.BROWSER) {
    // Attempt to create newrelic client using vip go package.
    try {
      const { newrelic, logger } = require('@automattic/vip-go'); // eslint-disable-line global-require
      const client = newrelic({
        logger: logger('irving:newrelic'),
      });

      // VIP Go's package can return nothing if newrelic is not installed or configured improperly.
      if (! client) {
        return defaultService;
      }

      return {
        client,
        start: () => {},
        logError(err) {
          client.noticeError(err);
        },
        logTransaction(method, status, category) {
          client.setTransactionName(`${method} ${status} ${category}`);
        },
      };
    } catch (err) {
      return defaultService;
    }
  }

  return defaultService;
};

module.exports = getService;