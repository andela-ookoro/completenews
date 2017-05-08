import React from 'react';
import PropTypes from 'prop-types';

// class to display sortBy
const SortBY = ({ data, onClick }) => (
  <button value={data} onClick={onClick}> {data} </button>
);
SortBY.propTypes = {
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default SortBY;
