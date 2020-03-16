export default {
  async getOrders(email) {
    try {
      const request = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/order/${email}`,
        {
          method: 'GET',
        }
      );
      const response = await request.json();
    
      console.log(response);
    } catch (error) {
      console.info('There was a problem.', error); // eslint-disable-line no-console
    }
    return {};
  },

  /**
   * Retrieve the header used to as an authorization token to authenticate
   * nexus requests.
   */
  async getRequestHeader() {
    try {
      const request = await fetch(
        `${process.env.API_ROOT_URL}/data/nexus_auth`
      );
      const { header, timestamp } = await request.json();

      return {
        header,
        expires: parseInt(timestamp, 10) + 300,
      };
    } catch (error) {
      console.info('There was a problem', error); // eslint-disable-line no-console
    }
    return {};
  },
};