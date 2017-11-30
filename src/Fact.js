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

// Contains all the logic for a fact and its 
// corresponding actions
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

  // stores fact's request url in state based on the kind of fact that
  // needs to be retrieved 
  fetchFactSource( day ) {
    if (day === 'today') {
      this.setState({fact_source : "http://numbersapi.com/" + this.props.month + "/" + this.props.day + "/date"}, () => {
          this.updateFactText(day);
      })
    } else if (day === 'random') {
      this.setState({fact_source : "http://numbersapi.com/random/date"}, () => {
          this.updateFactText(day);
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
          this.updateFactText('next');
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
          this.updateFactText('prev');
      })
    }
  }


  // updates the div with text from the Numbers API
  updateFactText ( type ) {
    const fact = this.state.fact_source
    let _ = this

    $.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
              callback();
            }
          });
          return this;
        }
    });

    // set animation based on kind of action
    $.ajax( {
        url: fact,
        dataType: 'jsonp',
        type: 'GET',
        success: function(data) {
          let animateStart = "fadeOutLeft";
          let animateEnd = "fadeInRight";
          if ( type === 'next' ) {
            animateStart = 'fadeOutLeft faster'
            animateEnd = 'fadeInRight faster'
          } else if ( type === 'prev' ) {
            animateStart = 'fadeOutRight faster'
            animateEnd = 'fadeInLeft faster'
          } else if ( type === 'today' ) {
            animateStart = 'flipOutX'
            animateEnd = 'flipInX'
          } else if ( type === 'random' ) {
            animateStart = 'bounceOut'
            animateEnd = 'bounceIn'
          }

          $('#fact_text').animateCss(animateStart, function () {
            $('#fact_text').html(data);

            // replace parts of text with hyperlinks to Wikipedia
            let nouns = _.getProperNouns(data)
            let keys = Object.keys(nouns)
            for (let i = 0; i < keys.length; i++){
              let titles = nouns[keys[i]]
              _.fetchPageId(titles)
            }
            $('#fact_text').animateCss(animateEnd)
          });


          // update date header to reflect user actions
          let text = data.split(' ')
          let month = text[0]
          let day = text[1]

          $('#curr_month').text(month)
          $('#curr_day').text(day) 


        }
    });
  }

  // get different kinds of fact based on users' actions

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

  // identify proper nouns in text and store in hashmap,
  // key being the first word in the phrase and value being an 
  // array of all the words in the phrase 
  getProperNouns (data) {

    let text = data.split(" ");
    let res = {};
    let aux = null;
    for (let i = 2; i < text.length; i++) { 

      if (text[i].charAt(0).match(/[a-zA-Z]/i) != null && text[i].charAt(0) === text[i].charAt(0).toUpperCase()) {
        if (aux == null ) {
          aux = []
        }

        let stripPunc = text[i].replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
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

  // constructs html based on url and the nouns
  // replaces text with new html string
  linkToWiki ( startTerm, url ) {

    let i = 0;
    let data = $('#fact_text').html()
    let nouns = this.getProperNouns(data)
    let text = [];
    let start = null;
    let end = -1;

    let words = data.split(" ")
    while (i < words.length) {
      if (nouns[startTerm] && words[i].includes(startTerm)) {
        start = '<a href=' + url + ' target="_blank">'
        end = i + nouns[startTerm].length
      } 

      if (start) {
        text.push(start)
        start = null
      }

      text.push(words[i])

      if (i === end-1) {
        text.push("</a>")
      }
      i += 1
    }

    let html = text.join(' ')
    $('#fact_text').html(html)

  }

  // fetches page id based on request string constructed from array 
  // of proper nouns
  fetchPageId (nouns) {
    let titles = nouns.join("%20")
    let request = "http://en.wikipedia.org/w/api.php?action=query&titles="+titles+"&prop=info&format=json"
    const remoteUrlWithOrigin = request
    let _ = this

    $.ajax( {
        url: remoteUrlWithOrigin,
        dataType: 'jsonp',
        type: 'GET',
        success: function(data) {
          let page_id = Object.keys(data["query"]["pages"])[0]
          let url = "https://en.wikipedia.org/?curid="+page_id
          if (page_id !== '-1') {
            _.linkToWiki(nouns[0], url)
          }
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
            classes="date_controls button_visibility_on"
          />
          <Header className="date_header" id="curr_month" as='h2'>{months[this.props.month-1]}</Header>&nbsp;
          <Header className="date_header" id="curr_day" as='h2'>{this.props.day}</Header>
          <div className="newLine"></div>
          <Button
            on_click={this.getFactForPrevDay}
            button_type="angle left"
            classes="date_controls button_visibility_off"
          />
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
