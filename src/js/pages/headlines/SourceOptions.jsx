import React from 'react';
import PropTypes from 'prop-types';

// class to display source
const SourceOptions = ({ id, title = '', name, fetchAvailableSort }) => (
  <div>
    <a className={'browser-default'} title={title} href={'#'} value={id} onClick={fetchAvailableSort} >
      {name }</a>
  </div>
);
SourceOptions.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  fetchAvailableSort: PropTypes.func.isRequired,
};

SourceOptions.defaultProps = {
  title: '',
};

export default SourceOptions;
