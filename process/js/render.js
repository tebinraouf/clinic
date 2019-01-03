/* eslint-disable */
const React = require('react');
const ReactDOM = require('react-dom');
const jQuery = require('jquery');
const $ = jQuery;
require('bootstrap');

const MainInterface = require('./MainInterface.jsx')

ReactDOM.render(<MainInterface />, document.getElementById('main'));
