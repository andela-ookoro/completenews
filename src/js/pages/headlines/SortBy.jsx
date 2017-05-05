import React from 'react';
import ReactDOM from 'react-dom';

// class to display sortBy
class SortBY extends React.Component {
  constructor() {
    super();
    this.fecthHealines = this.fecthHealines.bind(this);
    //console.log(this.fecthHealines);
  }
 
  render() {
    return (
      <button value={this.props.data} onClick={this.fecthHealines}> {this.props.data} 
      </button>
    );
  }
}
export default SortBY;
