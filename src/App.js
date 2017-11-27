import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fact from './Fact';
import './App.css';
import '../node_modules/animate.css/animate.min.css';

import { Icon, Grid } from 'semantic-ui-react'

const propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired, 
};


class App extends Component {

  // constructor(props) {
  //     super(props);
  // }

  render() {

    return (
      <div className="app">
        <Grid>
          <Grid.Row centered columns={1}>
            <Grid.Column textAlign='center'>
              <Icon name='calendar' size='huge' />
              <Fact 
                day={this.props.day}
                month={this.props.month}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

App.propTypes = propTypes;
export default App;
