/* eslint-disable */
const React = require("react");
const ReactDOM = require("react-dom");
const Sidebar = require("./Sidebar.jsx");
const MainContent = require("./MainContent.jsx");
// const MainInterface = require('./MainInterface');
// import MainInterface from "./MainInterface.js";
const SignIn = require("./SignIn.jsx");
const AddPatient = require("./AddPatient.jsx");
const AddAllPatients = require("./AddAllPatients.jsx");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      isAdding: false,
      isDashboard: true,
      isAllPatients: false
    };
    this.handleDashboard = this.handleDashboard.bind(this);
    this.allPatients = this.allPatients.bind(this);
    this.addPatient = this.addPatient.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleDashboard(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: false,
      isDashboard: true
    });
  }
  addPatient(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: true,
      isDashboard: false
    });
  }
  allPatients(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: true,
      isAdding: false,
      isDashboard: false
    });
  }
  handleLogout(e) {
    localStorage.setItem("isLoggedIn", "false");
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    let isLoggedInStorage = localStorage.getItem("isLoggedIn");
    let isLoggedIn = isLoggedInStorage == "true" ? true : false;

    if (isLoggedIn) {
      if (this.state.isAdding) {
        return (
          <div className="container-fluid">
            <div className="row">
              <Sidebar
                handleDashboard={this.handleDashboard}
                addPatient={this.addPatient}
                allPatients={this.allPatients}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
              />
              <MainContent />
              <AddPatient />
            </div>
          </div>
        );
      } else if (this.state.isAllPatients) {
        return (
          <div className="container-fluid">
            <div className="row">
            <Sidebar
                handleDashboard={this.handleDashboard}
                addPatient={this.addPatient}
                allPatients={this.allPatients}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
              />
              <MainContent />
              <AddAllPatients />
            </div>
          </div>
        );
      }

      return (
        <div className="container-fluid">
          <div className="row">
            <Sidebar
              handleDashboard={this.handleDashboard}
              addPatient={this.addPatient}
              allPatients={this.allPatients}
              handleLogout={this.handleLogout}
              isAdding={this.state.isAdding}
              isAllPatients={this.state.isAllPatients}
              isDashboard={this.state.isDashboard}
            />
            <MainContent />
          </div>
        </div>
      );
    } else {
      return <SignIn />;
    }
  }
}

module.exports = Dashboard;
