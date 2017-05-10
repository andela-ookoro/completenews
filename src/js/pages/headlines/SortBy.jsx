import React from 'react';
import PropTypes from 'prop-types';

// class to display sortBy
const SortBy = ({ data, onClick }) => (
  <button value={data} onClick={onClick}> {data} </button>
);
SortBy.propTypes = {
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default SortBy;
