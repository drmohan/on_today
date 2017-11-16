import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

const propTypes = {
  fact_source: PropTypes.string.isRequired, 
};

class App extends Component {

  // constructor(props) {
  //     super(props);
      // this.getColorClass= this.getColorClass.bind(this);
      // this.toggleAnimation = this.toggleAnimation.bind(this);

  // }

  componentWillMount () {
    const fact = this.props.fact_source
    $(function() {
      $.get(fact, function(data) {
        $('#number').text(data);
      });
    });
  }

  render() {
    return (
      <div className="fact">
        <span id="number"></span>
      </div>
    );
  }
}

App.propTypes = propTypes;
export default App;
