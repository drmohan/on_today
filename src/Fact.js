import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Fact.css';
import Button from './Button';
import { Header } from 'semantic-ui-react'


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

    this.fetchPageId = this.fetchPageId.bind(this);
    this.getProperNouns = this.getProperNouns.bind(this);
    this.linkToWiki = this.linkToWiki.bind(this);

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
    let _ = this

    $(function() {
      $.get(fact, function(data) {

        let nouns = _.getProperNouns(data)
        let keys = Object.keys(nouns)
        for (let i = 0; i < keys.length; i++){
          let titles = nouns[keys[i]]
          _.fetchPageId(titles)
        }

        $('#fact_text').html(data);
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

  getProperNouns (data) {

    let text = data.split(" ");
    let res = {};
    let aux = null;
    for (let i = 2; i < text.length; i++) { 

      if (!parseInt(text[i]) && text[i].charAt(0) === text[i].charAt(0).toUpperCase()) {
        if (aux == null ) {
          aux = []
        }

        let stripPunc = text[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        aux.push(stripPunc)
      } else {
        if (aux != null && aux.length > 0) {
          res[aux[0]] = aux;
        }
        aux = null
      }
    }  
    if (aux != null && aux.length > 0){
      res[aux[0]] = aux
    }

    return res
  }

  linkToWiki ( startTerm, url ) {

    let i = 0;
    let data = $('#fact_text').html()
    let nouns = this.getProperNouns(data)
    let keys = Object.keys(nouns)
    let text = [];
    let start = null;
    let end = -1;

    let words = data.split(" ")
    while (i < words.length) {
      if (words[i].includes(startTerm)) {
        start = '<a href=' + url + '>'
        end = i + nouns[startTerm].length
      } 

      if (start) {
        text.push(start)
        start = null
      }

      text.push(words[i])

      if (i == end-1) {
        text.push("</a>")
      }
      i += 1
    }

    let html = text.join(' ')
    $('#fact_text').html(html)

  }

  fetchPageId (nouns) {

    let titles = nouns.join("%20")
    let request = "https://en.wikipedia.org/w/api.php?action=query&titles="+titles+"&prop=info&format=json"
    const remoteUrlWithOrigin = request
    let _ = this

    $.ajax( {
        url: remoteUrlWithOrigin,
        dataType: 'jsonp',
        type: 'GET',
        success: function(data) {
           let page_id = Object.keys(data["query"]["pages"])[0]
           let url = "https://en.wikipedia.org/?curid="+page_id
           _.linkToWiki(nouns[0], url)
        }
    });
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
        <div className="bottom_controls">
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
