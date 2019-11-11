import { createAction } from '.';
import {
  REQUEST_AUTH,
  RECEIVE_USER_AUTH,
  INITIATE_USER_LOGIN,
  RECEIVE_USER_LOGIN,
  RECEIVE_REQUEST_HEADER,
  SUBMIT_USER_PASSWORD,
  RECEIVE_USER_LOGOUT,
  RECEIVE_NEW_USER_EMAIL,
} from './types';

/**
 * Create a Redux action that represents browser state change when a
 * authorization header is requested.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionRequestAuth() {
  return createAction(REQUEST_AUTH);
}

/**
 * Create a Redux action that represents browser state change when a
 * authorization information is received.
 *
 * @param {object} auth Authorization values retrieved from the Irving API.
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserAuth(auth) {
  return createAction(RECEIVE_USER_AUTH, { auth });
}

/**
 * Create a Redux action that represents browser state change when user submits
 * email to login.
 *
 * @param {*} email The email of the user requesting a login.
 * @returns {{type, payload}} The Redux action.
 */
export function actionInitiateUserLogin(email) {
  return createAction(INITIATE_USER_LOGIN, { email });
}

/**
 * Create Redux action that represents browser state change when user is found.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserLogin(user) {
  return createAction(RECEIVE_USER_LOGIN, { user });
}

/**
 * Create a Redux action that represents browser state change when a user submits
 * their password.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionSubmitUserPassword(password) {
  return createAction(SUBMIT_USER_PASSWORD, { password });
}

/**
 * Create a Redux action that represents browser state change when an Authoriztion header is
 * received from WordPress.
 *
 * @param {{type, payload}} header The Redux action.
 */
export function actionReceiveRequestHeader(header) {
  return createAction(RECEIVE_REQUEST_HEADER, { header });
}

/**
 * Create a Redux action that represents browser state change when a user logs out.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveUserLogout() {
  return createAction(RECEIVE_USER_LOGOUT);
}

/**
 * Create a Redux action that represents browser state change when a user logs out.
 *
 * @returns {{type, payload}} The Redux action.
 */
export function actionReceiveNewUserEmail(email) {
  return createAction(RECEIVE_NEW_USER_EMAIL, { email });
}

