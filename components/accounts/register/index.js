import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import {
  getIsLoading,
  getForms,
} from 'selectors/zephrSelector';
import {
  actionSubmitForm,
  actionReceiveInvalidPassword,
} from 'actions/zephrActions';
import LazyRecaptcha from './recaptcha';

// Styles
import styles from './register.css';

const Register = ({
  isLoading,
  forms,
  submitRegistration,
  displayInvalidPasswordError,
}) => {
  const [captcha, setCaptcha] = useState({
    isValid: false,
    hasError: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Drop focus on the active form element.
    const focused = document.activeElement;
    focused.blur();

    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email-address');
    const password = document.getElementById('new-password');
    const verifyPassword = document.getElementById('verify-password');
    const termsCheckbox = document.getElementById('terms-checkbox');

    // Check to ensure the captcha has been validated prior to submission.
    if (false === captcha.isValid) {
      setCaptcha({
        hasError: true,
        isValid: false,
      });
      // Exit the submit process.
      return;
    }

    // Check to ensure the terms checkbox has been checked prior to submission.
    if (false === termsCheckbox.checked) {
      console.log('checkbox not checked');
      // displayFormError('terms-checkbox');
      // Exit the submit process.
      return;
    }

    // Check to ensure that the password and it's verification value match prior to submission.
    if (password.value !== verifyPassword.value) {
      displayInvalidPasswordError();
      // Exit the submit process.
      return;
    }

    if (! fullName.value.match(/^[\\p{L} .'-]+$/g)) {
      console.log('full name not entered');
      // displayFormError('full-name');
      // Exit the submit process.
      return;
    }

    // Split the fullName value for submission to Zephr.
    const names = fullName.value.split(' ');

    // Check to ensure that the email address is valid prior to submission.
    if (! email.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      console.log('invalid email address');
      // displayFormError('email-address');
      // Exit the submit process.
      return;
    }

    submitRegistration({
      type: 'registration',
      credentials: {
        email: email.value,
        password: password.value,
        attributes: {
          fullName: fullName.value,
          firstName: names[0],
          lastName: names[names.length - 1],
        },
      },
    });
  };

  const registrationForm = forms
    .filter((form) => '/register' === form.route)[0];

  const verifyCaptcha = () => {
    setCaptcha({
      isValid: true,
      hasError: false,
    });
  };

  // @todo define a site key/secret for the production captcha (see: https://www.google.com/u/1/recaptcha/admin/create)
  const reCaptcha = React.createElement(
    LazyRecaptcha,
    {
      key: 'registration-captcha',
      id: 'registration-captcha',
      className: 'captcha',
      sitekey: '6Le-58UUAAAAANFChf85WTJ8PoZhjxIvkRyWczRt',
      verifyCallback: verifyCaptcha,
      'aria-errormessage': 'captcha-error',
    },
    null
  );

  if (! isLoading && registrationForm) {
    const { components } = registrationForm;
    // Splice the captcha into the components array.
    const idMap = components.map((el) => el.props.id);
    // Prevent the captcha from being spliced in on subsequent renders.
    if (- 1 === idMap.indexOf('registration-captcha')) {
      components.splice(components.length - 1, 0, reCaptcha);
    }
  }

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {__('Thanks! Just one more step.', 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__('Complete your account information below.', 'mittr')}
      </p>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        {! isLoading && registrationForm ? (
          registrationForm.components
        ) : null}
        {true === captcha.hasError && (
          <span
            className={styles.formError}
            aria-live="assertive"
            id="captcha-error"
          >
            {__(
              `Oops! Let's try that again -
               Please complete the captcha
               in order to create your account.`,
              'mittr'
            )}
          </span>
        )}
        <h2 className={styles.confirmationText}>
          {__(
            "We'll email you a password confirmation link. Happy reading!", // eslint-disable-line quotes
            'mittr'
          )}
        </h2>
      </form>
    </div>
  );
};

Register.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  forms: PropTypes.array.isRequired,
  submitRegistration: PropTypes.func.isRequired,
  displayInvalidPasswordError: PropTypes.func.isRequired,
};

/* eslint-disable max-len */
const mapDispatchToProps = (dispatch) => ({
  submitRegistration: (registrationData) => dispatch(actionSubmitForm(registrationData)),
  displayInvalidPasswordError: () => dispatch(actionReceiveInvalidPassword()),
});
/* eslint-enable */

const withRedux = connect(
  (state) => ({
    isLoading: getIsLoading(state),
    forms: getForms(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(Register)
);
