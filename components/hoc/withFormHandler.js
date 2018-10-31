import React, { Component } from 'react';
import { connect } from 'react-redux';
import curry from 'lodash/fp/curry';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';
import { actionRequestSubmit } from 'actions/formActions';

const withFormHandler = (
  defaultState,
  connectedFormName = ''
) => (FormComponent) => {
  class FormHandler extends Component {
    state = defaultState;

    onChangeInput = curry((name, e) => {
      this.setState({ [name]: e.target.value });
    });

    render() {
      return (
        <div>
          <FormComponent
            {...this.props}
            {...this.state}
            onSubmit={connectedFormName ?
              this.props.createOnSubmit(this.state) :
              this.props.onSubmit
            }
            onChangeInput={this.onChangeInput}
          />
        </div>
      );
    }
  }

  FormHandler.propTypes = {
    onSubmit: PropTypes.func,
  };

  FormHandler.defaultProps = {
    onSubmit: (e) => {
      e.preventDefault();
    },
  };

  FormHandler.displayName = getDisplayName('FormHandler', FormComponent);

  // Set up a connected form, including submission handler
  if (connectedFormName) {
    // Add form state props to propTypes
    FormHandler.propTypes = {
      ...FormHandler.propTypes,
      submitting: PropTypes.bool.isRequired,
      submitted: PropTypes.bool.isRequired,
      failed: PropTypes.bool.isRequired,
      validation: PropTypes.objectOf(PropTypes.string).isRequired,
    };

    // Add redux functions
    const mapStateToProps = (state) => ({
      ...state[connectedFormName],
    });

    const mapDispatchToProps = (dispatch) => ({
      createOnSubmit: curry((submission, e) => {
        e.preventDefault();
        dispatch(actionRequestSubmit(connectedFormName, submission));
      }),
    });

    const withRedux = connect(
      mapStateToProps,
      mapDispatchToProps,
    );

    return withRedux(FormHandler);
  }

  return FormHandler;
};

export default withFormHandler;
