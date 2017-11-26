import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Fact.css';
import Button from './Button';
import { Icon, Header } from 'semantic-ui-react'


import $ from 'jquery';

const propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired, 
};

class Fact extends Component {

  constructor(props) {
    super(props);
    this.fetchFactSource = this.fetchFactSource.bind(this);
    this.updateFactText = this.updateFactText.bind(this);
    this.getFactForToday = this.getFactForToday.bind(this);
    this.getFactForRandomDay = this.getFactForRandomDay.bind(this);
    this.getFactForNextDay = this.getFactForNextDay.bind(this);
    this.getFactForPrevDay = this.getFactForPrevDay.bind(this);

    this.state = {fact_source: ""};
  } 

  componentWillMount () {
    this.getFactForToday()

  }

  componentDidMount () {
    this.getFactForToday()
  }

  fetchFactSource( day ) {
    if (day === 'today') {
      this.setState({fact_source : "http://numbersapi.com/" + this.props.month + "/" + this.props.day + "/date"}, () => {
          this.updateFactText();
      })
    } else if (day === 'random') {
      this.setState({fact_source : "http://numbersapi.com/random/date"}, () => {
          this.updateFactText();
      })
    } else if (day === 'next') {

      const months_to_int = {
        'January': 1, 
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12,
      } 

      let text = $('#fact_text').text();
      text = text.split(' ')
      let month = months_to_int[text[0]]
      let day = parseInt(text[1]) + 1

      this.setState({fact_source : "http://numbersapi.com/" + month + "/" + day + "/date"}, () => {
          this.updateFactText();
      })
    } else if (day === 'previous') {

      const months_to_int = {
        'January': 1, 
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12,
      } 

      let text = $('#fact_text').text();
      text = text.split(' ')
      let month = months_to_int[text[0]]
      let day = parseInt(text[1]) - 1

      this.setState({fact_source : "http://numbersapi.com/" + month + "/" + day + "/date"}, () => {
          this.updateFactText();
      })
    }
  }


  updateFactText () {
    const fact = this.state.fact_source

    $(function() {
      $.get(fact, function(data) {
        $('#fact_text').text(data);
        let text = data.split(' ')
        let month = text[0]
        let day = text[1]

        $('#curr_month').text(month)
        $('#curr_day').text(day) 

      });
    });
  }

  getFactForToday () {
    this.fetchFactSource('today')

  }

  getFactForRandomDay () {
    this.fetchFactSource('random')
  }

  getFactForNextDay () {
    this.fetchFactSource('next')
  }

  getFactForPrevDay () {
    this.fetchFactSource('previous')
  }

  render() {

    const months = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"]

    return (

      <div className="fact">
        <div className="date_header_wrapper">
          <Button
            on_click={this.getFactForPrevDay}
            button_type="angle left"
            classes="date_controls"
          />
          <Header className="date_header" id="curr_month" as='h2'>{months[this.props.month-1]}</Header>&nbsp;
          <Header className="date_header" id="curr_day" as='h2'>{this.props.day}</Header>
          <Button
            on_click={this.getFactForNextDay}
            button_type="angle right"
            classes="date_controls"
          />
        </div>
        <div id="fact_text" className="fact_text"></div>
        <div>
          <Button
            on_click={this.getFactForToday}
            button_type="refresh"
          />
          <Button
            on_click={this.getFactForRandomDay}
            button_type="random"
          />
        </div>
      </div>
    );
  }
}

Fact.propTypes = propTypes;
export default Fact;
