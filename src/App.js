import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

const propTypes = {
  fact: PropTypes.string.isRequired, 
};

class App extends Component {

  // constructor(props) {
  //     super(props);
      // this.getColorClass= this.getColorClass.bind(this);
      // this.toggleAnimation = this.toggleAnimation.bind(this);
  // }

  render() {
    return (
      <div className="fact">
        <div>{this.props.fact}</div>
      </div>
    );
  }
}

App.propTypes = propTypes;
export default App;
