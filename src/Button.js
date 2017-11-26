import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { Icon } from 'semantic-ui-react'
import classNames from 'classnames';


// import $ from 'jquery';

const propTypes = {
  on_click: PropTypes.func.isRequired, 
  button_type: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

class Button extends Component {

  render() {

    // const optional_classes = {
    //   'button_refresh': this.props.button_type === "refresh",
    // };

    // const button_classes = classNames( 
    //   'c-ent_nav_item',
    //   optional_classes,
    // );

    return (
      <div className="control">
        <Icon name={this.props.button_type} size='large' onClick={this.props.on_click} className={this.props.classes}/>
      </div>
    );
  }
}

Button.propTypes = propTypes;
export default Button;
