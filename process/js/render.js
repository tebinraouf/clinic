/* eslint-disable */
const React = require('react');
const ReactDOM = require('react-dom');
const jQuery = require('jquery');
require('bootstrap');
const SQL = require('sql.js');

const Dashboard = require('./Dashboard.jsx');
const SignIn = require('./SignIn.jsx');

const fs = eRequire('fs');
const $ = jQuery;

const filebuffer = fs.readFileSync('/Users/Tebin/Desktop/PatientManagement/test.sqlite');
const db = new SQL.Database(filebuffer);

class MainInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      showComponent: false,
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
    const res = db.exec('SELECT * FROM User');
    const name = res[0].values[0][1];
    const pass = res[0].values[0][2].toString();
    if (name === this.state.name && pass === this.state.password) {
      this.setState({
        showComponent: true,
      });
    } else {
      this.setState({
        showComponent: false,
      });
    }
   
  }

  render() {
    return (
      <div>
        {this.state.showComponent ? <Dashboard /> : (
          <SignIn
            handleButton={this.handleButton}
            name={this.state.name}
            password={this.state.password}
            handleNameChange={this.handleNameChange}
            handlePassChange={this.handlePassChange} />
        )}
      </div>
    );
  }
}


ReactDOM.render(<MainInterface />, document.getElementById('main'));
