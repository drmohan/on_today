import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

let today = new Date();
let day = today.getDate();
let month = today.getMonth()+1;


const root = document.getElementById('root')
ReactDOM.render(<App 
					day={day}
					month={month} />, root);

registerServiceWorker();
