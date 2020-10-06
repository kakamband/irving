import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import history from '@irvingjs/core/utils/history';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import {
  gtmPropTypes,
  getGTMDefaultProps,
} from '@irvingjs/styled/types/gtmPropTypes';
import * as defaultStyles from './themes/default';

/**
 * Search input.
 *
 * Form with an input field for search.
 */
const SearchForm = (props) => {
  const {
    baseUrl,
    gtmAction,
    gtmCategory,
    searchTerm,
    searchTermQueryArg,
    theme,
  } = props;
  const standardProps = useStandardProps(props);
  const {
    SearchFormWrapper,
    SearchFormTerm,
    SearchFormSubmitButton,
    SearchLabel,
  } = theme;

  const defaultValues = {};
  defaultValues[searchTermQueryArg] = searchTerm;

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    const currentQueryVars = queryString.parse(window.location.search);
    currentQueryVars[searchTermQueryArg] = data[searchTermQueryArg];

    // eslint-disable-next-line max-len
    history.push(`${baseUrl}?${queryString.stringify(currentQueryVars)}`);
  };

  return (
    <SearchFormWrapper
      {...standardProps}
      action={baseUrl}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SearchLabel>
        <SearchFormTerm
          aria-label="search"
          data-gtm-action={gtmAction}
          data-gtm-category={gtmCategory}
          name={searchTermQueryArg}
          placeholder="Search"
          ref={register}
          type="text"
        />
      </SearchLabel>
      <SearchFormSubmitButton type="submit">Search</SearchFormSubmitButton>
    </SearchFormWrapper>
  );
};

SearchForm.defaultProps = {
  ...getGTMDefaultProps(),
  ...getStandardDefaultProps(),
  theme: defaultStyles,
  baseUrl: '/',
  searchTerm: '',
  searchTermQueryArg: 'search',
};

SearchForm.propTypes = {
  ...gtmPropTypes,
  ...standardPropTypes,
  /**
   * Base url for search.
   */
  baseUrl: PropTypes.string,
  /**
   * The string being searched for.
   */
  searchTerm: PropTypes.string,
  /**
   * The query var used for the search term.
   */
  searchTermQueryArg: PropTypes.string,
};

const themeMap = {
  default: defaultStyles,
};

export {
  SearchForm as Component,
  themeMap,
};

export default SearchForm;
