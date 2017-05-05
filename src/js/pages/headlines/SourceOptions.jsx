import React from 'react';

// class to display source
// class to display sortBy
// class to display source
class SourceOptions extends React.Component {
  render() {
    return (
      <option value={this.props.data.id}>{this.props.data.name}</option>
    );
  }
}

export default SourceOptions;
