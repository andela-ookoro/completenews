import React from 'react';
// class to display sortBy
class SortBY extends React.Component {
  render() {
      // console.log(this.props.onClick);
    return (
      <button value={this.props.data} onClick={this.props.onClick}> {this.props.data} 
      </button>
    );
  }
}
export default SortBY;
