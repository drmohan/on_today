import React from 'react';
import ReactDOM from 'react-dom';
import Fact from './Fact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Fact />, div);
});
