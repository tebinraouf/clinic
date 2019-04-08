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
const Portfolio = require("./Portfolio.jsx");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDashboard: true,
      isAllPatients: false,
      isAdding: false,
      isAddingProcedure: false,
      isPortfolio: false,
      isLoggedIn: true,
    };
    this.handleDashboard = this.handleDashboard.bind(this);
    this.allPatients = this.allPatients.bind(this);
    this.addPatient = this.addPatient.bind(this);
    this.addProcedureList = this.addProcedureList.bind(this);
    this.handlePortfolio = this.handlePortfolio.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleDashboard(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: false,
      isDashboard: true,
      isAddingProcedure: false,
      isPortfolio: false
    });
  }
  addPatient(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: true,
      isDashboard: false,
      isAddingProcedure: false,
      isPortfolio: false
    });
  }
  allPatients(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: true,
      isAdding: false,
      isDashboard: false,
      isAddingProcedure: false,
      isPortfolio: false
    });
  }
  addProcedureList(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: false,
      isDashboard: false,
      isAddingProcedure: true,
      isPortfolio: false
    });
  }
  handleLogout(e) {
    localStorage.setItem("isLoggedIn", "false");
    this.setState({
      isLoggedIn: true
    });
  }
  handlePortfolio(e) {
    e.preventDefault();
    this.setState({
      isAllPatients: false,
      isAdding: false,
      isDashboard: false,
      isAddingProcedure: false,
      isPortfolio: true
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
                handlePortfolio={this.handlePortfolio}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
                isAddingProcedure={this.state.isAddingProcedure}
                isPortfolio={this.state.isPortfolio}
              />
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
                handlePortfolio={this.handlePortfolio}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
                isAddingProcedure={this.state.isAddingProcedure}
                isPortfolio={this.state.isPortfolio}
              />
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
                handlePortfolio={this.handlePortfolio}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
                isAddingProcedure={this.state.isAddingProcedure}
                isPortfolio={this.state.isPortfolio}
              />
              <AddProcedureList />
            </div>
          </div>
        )
      } else if (this.state.isPortfolio) {
        return (
          <div className="container-fluid">
            <div className="row">
            <Sidebar
                handleDashboard={this.handleDashboard}
                addPatient={this.addPatient}
                allPatients={this.allPatients}
                addProcedureList={this.addProcedureList}
                handlePortfolio={this.handlePortfolio}
                handleLogout={this.handleLogout}
                isAdding={this.state.isAdding}
                isAllPatients={this.state.isAllPatients}
                isDashboard={this.state.isDashboard}
                isAddingProcedure={this.state.isAddingProcedure}
                isPortfolio={this.state.isPortfolio}
              />
              <Portfolio />
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
              handlePortfolio={this.handlePortfolio}
              handleLogout={this.handleLogout}
              isAdding={this.state.isAdding}
              isAllPatients={this.state.isAllPatients}
              isDashboard={this.state.isDashboard}
              isAddingProcedure={this.state.isAddingProcedure}
              isPortfolio={this.state.isPortfolio}
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
