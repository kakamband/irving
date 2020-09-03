import { createSelector } from 'reselect';
import { maybeSelect } from './utils';

const coralSelector = (state) => state.integrations.coral;

export const tokenSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'token')
);

export const purgeSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'purgeUser')
);

export const requireUsernameSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'requireUsername')
);

export const showUpgradeModalSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'showUpgradeModal')
);

export const validationErrorSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'validationError')
);

export const usernameSetHashSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'usernameSetHash')
);

export const loginStatusSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'loggedIn')
);

export const verificationRequestSelector = createSelector(
  coralSelector,
  (branch) => maybeSelect(branch, 'verificationRequestSent')
);
