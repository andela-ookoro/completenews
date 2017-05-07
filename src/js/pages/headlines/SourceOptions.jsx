import React from 'react';
import PropTypes from 'prop-types';

// class to display source
const SourceOptions = ({ id, description = '', name, fetchAvailableSort }) => (
  <div>
    <a className={'browser-default'} title={description}  href={'#'} value={id} onClick={fetchAvailableSort}>
      {name }
    </a>
  </div>
);
SourceOptions.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  fetchAvailableSort: PropTypes.func.isRequired,
};
export default SourceOptions;
