import React from 'react';
import PropTypes from 'prop-types';

import SourceOptions from './SourceOptions';

const Category = ({ category, sources, fetchAvailableSort }) => (
  <li>
    <div className="collapsible-header"> {this.props.category} </div>
    <div className="collapsible-body">
      {this.props.sources.map((source) =>
        <SourceOptions
          key={source.id} name={source.name} title={source.description}
          id={source.id} fetchAvailableSort={this.props.fetchAvailableSort}
        />,
      )}
    </div>
  </li>
);

Category.propTypes = {
  sources: PropTypes.Array.isRequired,
  category: PropTypes.string.isRequired,
  fetchAvailableSort: PropTypes.func.isRequired,
};

export default Category;
