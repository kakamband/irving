import {
  call,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects';
import {
  actionReceiveUserSession,
  actionReceiveUserVerification,
} from 'actions/zephrActions';
import {
  VERIFY_ZEPHR_USER_TOKEN,
  RECEIVE_ZEPHR_USER_VERIFICATION,
} from 'actions/types';
import zephrService from 'services/zephrService';
import history from 'utils/history';
import createDebug from 'services/createDebug';
import {
  isSSO,
} from 'selectors/zephrSelector';
import {
  getProfile,
  getAccount,
} from '../forms/submitForm';

const debug = createDebug('sagas:tokenExchange');

export default [
  // Listen for token verification request.
  takeEvery(VERIFY_ZEPHR_USER_TOKEN, verifyToken),
  // Listen to verification success response and run a conditional check for redirect.
  takeEvery(RECEIVE_ZEPHR_USER_VERIFICATION, redirectUser),
];

/**
 * A generator that is called when a user requests verification with an email token.
 */
function* verifyToken({ payload }) {
  try {
    const cookie = yield call(zephrService.verifyEmail, payload);

    if (false !== cookie) {
      // Store the session data for later use.
      yield put(actionReceiveUserSession({ sessionCookie: cookie }));
      // Get the user's profile.
      yield call(getProfile, cookie);
      // Get the user's account.
      yield call(getAccount, cookie);
      // Wait until profile and account details have been retrieved to redirect.
      yield put(actionReceiveUserVerification());
    }
  } catch (error) {
    yield call(debug, error);
  }
}

/**
 * A generator that is invoked on a successful token verification and determines whether
 * or not the user should be redirected to a 'final-step' page to complete their Zephr
 * profile.
 */
function* redirectUser() {
  const requireProfile = yield select(isSSO);

  if (true === requireProfile) {
    history.push('/register/sso/final-step/');
  }
}