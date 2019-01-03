/* eslint-disable */
const React = require("react");
const ReactDOM = require('react-dom');
const Sidebar = require("./Sidebar.jsx");
const MainContent = require("./MainContent.jsx");
// const MainInterface = require('./MainInterface');
// import MainInterface from "./MainInterface.js";
const SignIn = require('./SignIn.jsx');


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
    this.addPatient = this.addPatient.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  addPatient(e) {
    e.preventDefault();
    console.log("hi...");
  }
  handleLogout(e) {
    localStorage.setItem("isLoggedIn", "false");
    this.setState({
      isLoggedIn: true,
    });
  }

  render() {
    let isLoggedInStorage = localStorage.getItem("isLoggedIn");
    let isLoggedIn = isLoggedInStorage == "true" ? true : false;

    if (isLoggedIn) {
      return (
        <div className="container-fluid">
          <div className="row"> 
            <Sidebar 
              addPatient={this.addPatient}
              handleLogout={this.handleLogout}
            />
            <MainContent />
          </div>
        </div>
      );
    } else {
      debugger
      return (
        <SignIn on/>
      );
    }
  }
}

module.exports = Dashboard;
