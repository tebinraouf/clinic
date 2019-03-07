/* eslint-disable */
const React = require("react");
const jquery = require("jquery");
const $ = jquery;
const Patient = require("./Patient");
const ReactBsTable = require("react-bootstrap-table");
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class AddProcedureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      status: "",
      procedureList: new Array()
    };
    this.AddProcedure = this.AddProcedure.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  componentDidMount() {
    this.updateData();
  }

  updateData() {
    let self = this;
    let p = new Patient();
    p.getProcedureTypes(function(data) {
      self.setState({
        procedureList: data
      });
    });
  }

  AddProcedure(e) {
    e.preventDefault();
    console.log(this.state.value);
    var p = new Patient();
    p.addProcedure(this.state.value);
    this.setState({
      value: "",
      status: "Added."
    });
    this.updateData()
  }
  handleChange(e) {
    var name = e.target.value;
    this.setState({
      value: name,
      status: ""
    });
  }
  onDeleteRow(rows) {
    var self = this;
    let p = new Patient();
    p.deleteProcedureTypeByID(rows[0], function(isDeleted){
      if (isDeleted) {
        self.updateData();
      }
    });
  }

  render() {
    const options = {
      onDeleteRow: this.onDeleteRow
    };
    const selectRow = {
      mode: "radio" //radio or checkbox
    };

    return (
      <div className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-12 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle" />
              <h3 className="page-title">Add New Procedure</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <form onSubmit={e => this.AddProcedure(e)}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="procedureName">Procedure Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="procedureName"
                      name="proName"
                      onChange={this.handleChange}
                      placeholder="Enter Procedure Name"
                      value={this.state.value}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <h5>{this.state.status}</h5>
                  </div>
                </div>
                <br />
                <div className="form-row">
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-accent">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12">
              <BootstrapTable
                data={this.state.procedureList}
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
                  dataField="name"
                  filter={{ type: "TextFilter" }}
                >
                  First Name
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = AddProcedureList;
