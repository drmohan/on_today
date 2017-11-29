import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { Icon } from 'semantic-ui-react'

const propTypes = {
  on_click: PropTypes.func.isRequired, 
  button_type: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

class Button extends Component {

  render() {

    return (
      <div className="control">
        <Icon name={this.props.button_type} size='large' onClick={this.props.on_click} className={this.props.classes}/>
      </div>
    );
  }
}

Button.propTypes = propTypes;
export default Button;
