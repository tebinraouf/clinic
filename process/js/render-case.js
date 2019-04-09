/* eslint-disable */
import React, { Component } from "react";
import ReactDOM from 'react-dom';

const jQuery = require('jquery');
const $ = jQuery;
require('bootstrap');


import PatientCase from './PatientCase.jsx';

ReactDOM.render(<PatientCase />, document.getElementById('main-case'));