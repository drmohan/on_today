import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Fact.css';
import $ from 'jquery';

const propTypes = {
  fact_source: PropTypes.string.isRequired, 
  on_refresh: PropTypes.func.isRequired, 
};

class Fact extends Component {

  componentWillMount () {
    const fact = this.props.fact_source
    $(function() {
      $.get(fact, function(data) {
        $('#fact_text').text(data);
      });
    });
  }

  render() {
    return (
      <div className="fact">
        <span id="fact_text" className="fact_text"></span>
      </div>
    );
  }
}

Fact.propTypes = propTypes;
export default Fact;
