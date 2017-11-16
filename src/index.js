import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var today = new Date();
var day = today.getDate();
var month = today.getMonth()+1;

console.log(day)
console.log(month)

const fact_source = "http://numbersapi.com/" + month + "/" + day + "/date"

const root = document.getElementById('root')
ReactDOM.render(<App fact_source={fact_source}/>, root);

registerServiceWorker();
