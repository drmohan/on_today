import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fact from './Fact';
import './App.css';
import { Header } from 'semantic-ui-react'

const propTypes = {
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired, 
  year: PropTypes.string.isRequired, 
};


class App extends Component {

  constructor(props) {
      super(props);
      this.fact_source = ""
      this.fetchFact = this.fetchFact.bind(this);
  } 

  componentWillMount () {
    this.fetchFact()
  }

  fetchFact() {
    this.fact_source = "http://numbersapi.com/" + this.props.month + "/" + this.props.day + "/date";
  }

  render() {
    const months = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"]

    return (
      <div className="app">
        <Header as='h2'>{months[this.props.month-1]} {this.props.day}, {this.props.year}</Header>
        <Fact 
          fact_source={this.fact_source} 
          on_refresh={this.fetchFact}
        />
      </div>
    );
  }
}

App.propTypes = propTypes;
export default App;
