/* eslint-disable */
const React = require('react');
const ReactDOM = require('react-dom');
const jQuery = require('jquery');
const $ = jQuery;
require('bootstrap');


const PatientCase = require('./PatientCase.jsx')

ReactDOM.render(<PatientCase />, document.getElementById('main-case'));