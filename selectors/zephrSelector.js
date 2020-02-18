import { createSelector } from 'reselect';

export const zephrSelector = (state) => state.zephr;

export const getIsLoading = createSelector(
  zephrSelector,
  (state) => state.isLoading,
);

export const getForms = createSelector(
  zephrSelector,
  (state) => state.forms,
);

export const getCached = createSelector(
  zephrSelector,
  (state) => state.cached,
);

export const getUser = createSelector(
  zephrSelector,
  (state) => state.user,
);

export const getAccount = createSelector(
  zephrSelector,
  (state) => state.user.account,
);

export const getProfile = createSelector(
  zephrSelector,
  (state) => state.user.profile,
);

export const getEmail = createSelector(
  zephrSelector,
  (state) => state.user.account.emailAddress,
);

export const getFirstName = createSelector(
  zephrSelector,
  (state) => state.user.profile.firstName,
);

export const getLastName = createSelector(
  zephrSelector,
  (state) => state.user.profile.lastName,
);

export const getSession = createSelector(
  zephrSelector,
  (state) => state.session,
);

export const getEmailVerified = createSelector(
  zephrSelector,
  (state) => state.user.emailVerified,
);
