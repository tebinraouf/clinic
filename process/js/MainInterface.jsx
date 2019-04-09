/* eslint-disable */
import React, { Component } from 'react';
import Dashboard from "./Dashboard.jsx";
import SignIn from "./SignIn.jsx";
import Patient from "./Patient";


class MainInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      showComponent: false
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handlePassChange(event) {
    this.setState({ password: event.target.value });
  }

  handleButton(e) {
    e.preventDefault();
    var self = this;
    var p = new Patient();
    p.getLogin(function(name, pass) {
      if (name === self.state.name && pass === self.state.password) {
        self.setState({
          showComponent: true
        });
        localStorage.setItem("isLoggedIn", "true");
      } else {
        self.setState({
          showComponent: false
        });
        localStorage.setItem("isLoggedIn", "false");
      }
    });
  }

  render() {
    let isLoggedInStorage = localStorage.getItem("isLoggedIn");
    let isLoggedIn = isLoggedInStorage == "true" ? true : false;

    // debugger
    if (isLoggedIn) {
      return <Dashboard />;
    } else {
      return (
        <SignIn
          handleButton={this.handleButton}
          name={this.state.name}
          password={this.state.password}
          handleNameChange={this.handleNameChange}
          handlePassChange={this.handlePassChange}
        />
      );
    }

    

    // return (
    //   <div>
    //     {isLoggedIn ? <Dashboard /> : (
    //       <SignIn
    //         handleButton={this.handleButton}
    //         name={this.state.name}
    //         password={this.state.password}
    //         handleNameChange={this.handleNameChange}
    //         handlePassChange={this.handlePassChange} />
    //     )}
    //   </div>
    // );
  }
}

export default MainInterface;
