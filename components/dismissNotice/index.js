import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'critical-style-loader/lib';
import { actionDismissNotice } from 'actions';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './dismissNotice.css';

const DismissNotice = ({ children, isNoticeVisible, dismiss }) => (
  <>
    {isNoticeVisible && (
      <div className={styles.wrapper}>
        <div className={styles.component}>
          {children}
        </div>
        <button onClick={dismiss} type="button">
          {__('Dismiss', 'mittr')}
        </button>
      </div>
    )}
  </>
);

DismissNotice.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isNoticeVisible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dismiss: () => dispatch(actionDismissNotice()),
});

const withRedux = connect(
  (state) => ({
    isNoticeVisible: state.isNoticeVisible,
  }),
  mapDispatchToProps,
);

export default withRedux(withStyles(styles)(DismissNotice));

