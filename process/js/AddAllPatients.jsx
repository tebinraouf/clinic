/* eslint-disable */
const React = require("react");
const jquery = require("jquery");
const $ = jquery;
const ReactBsTable = require("react-bootstrap-table");
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;
const Patient = require("./Patient");
const SelectedPatient = require("./SelectedPatient.jsx");

class AddAllPatients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      patient: null,
      isClicked: false,
      isDeleted: false
    };
    this.onRowClick = this.onRowClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  componentDidMount() {
    var self = this;
    var p = new Patient();
    p.getAll(function(allData) {
      self.setState({ data: allData });
    });
  }
  onRowClick(row) {
    this.setState({ patient: row, isClicked: true });
  }
  handleDelete() {
    var self = this;
    // debugger;
    var p = new Patient();
    p.deletePatientProfile(this.state.patient.id, function(isDeleted) {
      self.setState({
        isClicked: false,
        isDeleted: true
      });
      self.updateData();
    });
  }

  updateData() {
    var self = this;
    //update patients data
    var p = new Patient();
    p.getAll(function(allData) {
      self.setState({ data: allData });
    });
  }
  onDeleteRow(rows) {
    debugger
    var self = this;
    var p = new Patient();
    p.deletePatientProfile(rows[0], function(isDeleted) {
      //
    });
  }

  render() {
    const options = {
      onRowClick: this.onRowClick,
      onDeleteRow: this.onDeleteRow
    };
    const selectRow = {
      mode: "radio" //radio or checkbox
    };

    if (this.state.isClicked) {
      return (
        <SelectedPatient
          patient={this.state.patient}
          handleDelete={this.handleDelete}
        />
      );
    } else {
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
                <BootstrapTable
                  data={this.state.data}
                  options={options}
                  deleteRow
                  selectRow={selectRow}
                  striped
                  hover
                >
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
                    First Visit Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="mobile"
                    filter={{ type: "TextFilter" }}
                  >
                    Mobile
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="gender"
                    filter={{ type: "TextFilter" }}
                  >
                    Gender
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

module.exports = AddAllPatients;
