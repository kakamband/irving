import React, { useEffect } from 'react';
// import toReactElement from 'utils/toReactElement';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import styles from './magazineIssues.css';

const MagazineIssuesList = ({
  data,
  setData,
  lastUpdate,
}) => {
  useEffect(() => {
    if (lastUpdate !== data && 0 < data.length) {
      if (5 > data.length) {
        setData(data, false);
      } else {
        setData(data, true);
      }
    }
  }, [data]);

  return <span className={styles.hidden}>Updated</span>;
};

MagazineIssuesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUpdate: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
};

export default withStyles(styles)(MagazineIssuesList);