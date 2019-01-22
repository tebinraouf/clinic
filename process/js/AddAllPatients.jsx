/* eslint-disable */
const React = require("react");
const jquery = require("jquery");
const $ = jquery;
const ReactBsTable = require("react-bootstrap-table");
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;
const Patient = require("./Patient");

var allPatients = [];

class AddAllPatients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }
  componentDidMount() {
    var self = this;
    var p = new Patient();
    p.getAll(function(allData) {
      self.setState({ data: allData });
    });
  }
  render() {
    // debugger
    return (
      <div className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-12 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle" />
              <h3 className="page-title">All Patients</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <BootstrapTable data={this.state.data} striped hover>
                <TableHeaderColumn
                  isKey
                  dataField="id"
                  filter={{ type: "TextFilter" }}
                >
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="firstName"
                  filter={{ type: "TextFilter" }}
                >
                  First Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="lastName"
                  filter={{ type: "TextFilter" }}
                >
                  Last Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="date"
                  filter={{ type: "TextFilter" }}
                >
                  Product Price
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = AddAllPatients;
