import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './register.css';

const ConfirmRegistration = () => (
  <div className={styles.accountWrap}>
    <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
    <p className={styles.accountSubHeader}>
      {__('Thank you!', 'mittr')}
    </p>
    <p className={styles.accountHeaderDescription}>
      {__(
        `Your online account is complete!
          Please check your inbox for a verification email.`,
        'mittr'
      )}
    </p>
    <Link to="/" className={styles.homeButton}>Go Home</Link>
  </div>
);

export default withStyles(styles)(ConfirmRegistration);