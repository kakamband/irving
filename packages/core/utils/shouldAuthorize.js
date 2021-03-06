import get from 'lodash/fp/get';
import isNode from './isNode';

/**
 * Retrieve the bearer token cookie.
 *
 * @param {object} cookie Object containing valid cookies for the app.
 */
export const getBearerToken = (cookie) => (
  get('authorizationBearerToken', cookie)
);

/**
 * Determine if we should check if user is authorized (and make an authorized request).
 * We are only doing this client side to bypass edge caching on SSR.
 *
 * @param {object} cookie Object containing valid cookies for the app.
 */
export default function shouldAuthorize(cookie) {
  const authorizationBearerToken = getBearerToken(cookie);
  return (authorizationBearerToken && ! isNode()) ?
    authorizationBearerToken : false;
}
