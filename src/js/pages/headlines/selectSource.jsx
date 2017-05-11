import React from 'react';
import PropTypes from 'prop-types';

// class to display source
const SelectSource = ({ id, title = '', name, fetchAvailableSort }) => (
    <a className={'browser-default'} title={title} href={'#'} value={id} onClick={fetchAvailableSort}>
      {name }</a>
);
SelectSource.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  fetchAvailableSort: PropTypes.func.isRequired,
};

SelectSource.defaultProps = {
  description: '',
  title: '',
};

export default SelectSource;
