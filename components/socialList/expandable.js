import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import styles from './expandable.css';

const ExpandableSocialShare = (props) => {
  const {
    children,
  } = props;
  const [sharingIsVisible, setSharingIsVisible] = useState(false);

  if (sharingIsVisible) {
    document.addEventListener('click', handleCloseSharing, { once: true });
  }
  function handleCloseSharing() {
    setSharingIsVisible(false);
  }

  return (
    <div className={styles.shareMenu}>
      <button
        type="button"
        aria-label={__('Open share menu', 'mittr')}
        className={styles.shareMenuToggle}
        onClick={() => {
          setSharingIsVisible(! sharingIsVisible);
        }}
        aria-haspopup
        aria-expanded={sharingIsVisible}
      >
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </button>
      <div className={styles.shareMenuFlyOut}>
        {sharingIsVisible && children}
      </div>
    </div>
  );
};

ExpandableSocialShare.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ExpandableSocialShare;