import React from 'react';

// class to display source
class SourceOptions extends React.Component {
  render() {
    return (
      <option value={this.props.data.id } title={this.props.data.description}>{this.props.data.name}</option>
    );
  }
}

export default SourceOptions;
