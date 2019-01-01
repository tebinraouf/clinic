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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleButton() {
    const res = db.exec('SELECT * FROM User');

    console.log(this.state.name);

    this.setState({
      showComponent: true,
    });
  }

  render() {
    return (
      <div>
        {this.state.showComponent ? <Dashboard /> : (
          <SignIn
            handleButton={this.handleButton}
            name={this.state.name}
            password={this.state.password}
            handleChange={this.handleChange} />
        )}
      </div>
    );
  }
}


ReactDOM.render(<MainInterface />, document.getElementById('main'));
