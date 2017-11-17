import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

const today = new Date();
const day = today.getDate();
const month = today.getMonth()+1;
const year = today.getFullYear();

const root = document.getElementById('root')
ReactDOM.render(<App 
					day={day}
					month={month}
					year={year} />, root);

registerServiceWorker();
