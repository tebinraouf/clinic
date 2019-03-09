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
const AddProcedureList = require("./AddProcedureList.jsx");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDashboard: true,
      isAllPatients: false,
      isAdding: false,
      isAddingProcedure: false,
      isLoggedIn: true,
    };
    this.handleDashboard = this.handleDashboard.bind(this);
    this.allPatients = this.allPatients.bind(this);
    this.addPatient = this.addPatient.bind(this);
    this.addProcedureList = this.addProcedureList.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleDashboard(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: false,
      isDashboard: true,
      isAddingProcedure: false
    });
  }
  addPatient(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: true,
      isDashboard: false,
      isAddingProcedure: false
    });
  }
  allPatients(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: true,
      isAdding: false,
      isDashboard: false,
      isAddingProcedure: false
    });
  }
  addProcedureList(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: false,
      isDashboard: false,
      isAddingProcedure: true
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
                addProcedureList={this.addProcedureList}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
                isAddingProcedure={this.state.isAddingProcedure}
              />
              {/* <MainContent /> */}
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
                addProcedureList={this.addProcedureList}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
                isAddingProcedure={this.state.isAddingProcedure}
              />
              {/* <MainContent /> */}
              <AddAllPatients />
            </div>
          </div>
        );
      } else if (this.state.isAddingProcedure) {
        return (
          <div className="container-fluid">
            <div className="row">
            <Sidebar
                handleDashboard={this.handleDashboard}
                addPatient={this.addPatient}
                allPatients={this.allPatients}
                addProcedureList={this.addProcedureList}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
                isAddingProcedure={this.state.isAddingProcedure}
              />
              {/* <MainContent /> */}
              <AddProcedureList />
            </div>
          </div>
        )
      }

      return (
        <div className="container-fluid">
          <div className="row">
            <Sidebar
              handleDashboard={this.handleDashboard}
              addPatient={this.addPatient}
              allPatients={this.allPatients}
              addProcedureList={this.addProcedureList}
              handleLogout={this.handleLogout}
              isAdding={this.state.isAdding}
              isAllPatients={this.state.isAllPatients}
              isDashboard={this.state.isDashboard}
              isAddingProcedure={this.state.isAddingProcedure}
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
