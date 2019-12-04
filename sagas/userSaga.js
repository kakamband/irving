import {
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import {
  actionReceiveUserLogin,
  actionRequestAuth,
  actionReceiveUserAuth,
  actionReceiveRequestHeader,
  actionReceiveNewUserEmail,
  actionStorePendingEmail,
} from 'actions/userActions';
import {
  authSelector,
  isValid as isAuthValid,
  validTo,
  authHeader,
  getUsername,
  getUserId,
  getPendingEmailAddress,
} from 'selectors/getUser';
import createDebug from 'services/createDebug';
import nexusService from 'services/nexusService';
import {
  INITIATE_USER_LOGIN,
  SUBMIT_USER_PASSWORD,
  INITIATE_USER_REGISTRATION,
  SUBMIT_USER_REGISTRATION,
} from '../actions/types';

const debug = createDebug('sagas:login');

export default [
  takeEvery(INITIATE_USER_LOGIN, validateEmailAddress),
  takeEvery(SUBMIT_USER_PASSWORD, authorize),
  takeEvery(INITIATE_USER_REGISTRATION, storePendingEmailAddress),
  takeEvery(SUBMIT_USER_REGISTRATION, register),
];

function* getRequestHeader() {
  let header = yield select(authHeader);

  if (! header || 0 >= header.length) {
    const response = yield call(nexusService.getRequestHeader);
    header = response.header; // eslint-disable-line prefer-destructuring
    yield put(actionReceiveRequestHeader(response));
  }

  return header;
}

function* validateEmailAddress({ payload: { email } }) {
  const header = yield call(getRequestHeader);

  try {
    const response = yield call(nexusService.getAccount, { email, header });

    if (response.username) {
      yield put(actionReceiveUserLogin({ ...response, email }));

      window.location.pathname = '/login/verified';
    } else {
      yield put(actionReceiveNewUserEmail(email));

      window.location.pathname = '/register';
    }
  } catch (error) {
    yield call(debug, error);
  }
}

function* authorize({ payload: { password } }) {
  const hasAuth = yield select(isAuthValid);
  const timeLimit = yield select(validTo);
  const timestamp = Math.floor(Date.now() / 1000);
  const isValid = hasAuth && timestamp < timeLimit;

  try {
    if (! isValid) {
      const header = yield call(getRequestHeader);
      const username = yield select(getUsername);
      const userId = yield select(getUserId);

      yield put(actionRequestAuth());

      const session = yield call(
        nexusService.newSession, { username, password, header }
      );

      if (false !== session.isValid) {
        // Store session data.
        yield put(actionReceiveUserAuth(session));
        // Login the user.
        yield call(login, { id: userId, password, header });
      } else {
        // @todo define error state.
        throw new Error('Session request failed: ', session);
      }
      return session;
    }
  } catch (error) {
    yield call(debug, error);
  }

  // User already exists
  return yield select(authSelector);
}

function* login({ id, password }) {
  const header = yield call(getRequestHeader);

  try {
    const response = yield call(nexusService.login, { id, password, header });

    if ('authenticated' === response.status) {
      window.location.pathname = '/';
    }
  } catch (error) {
    yield call(debug, error);
  }
}

function* storePendingEmailAddress({ email }) {
  yield put(actionStorePendingEmail(email));
}

function* register({ fullName, password }) {
  const header = yield call(getRequestHeader);

  try {
    const email = yield select(getPendingEmailAddress);

    const response = yield call(
      nexusService.createAccount, {
        email,
        fullName,
        password,
        header,
      }
    );
    console.log(response); // eslint-disable-line no-console
  } catch (error) {
    yield call(debug, error);
  }
}
