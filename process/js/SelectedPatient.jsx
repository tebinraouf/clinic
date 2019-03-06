/* eslint-disable */
const React = require("react");
const jquery = require("jquery");
const Patient = require("./Patient");
const Procedure = require("./Procedure.jsx");
const $ = jquery;
const DayPickerInput = require("react-day-picker/DayPickerInput").default;
const ReactBsTable = require("react-bootstrap-table");
const BootstrapTable = ReactBsTable.BootstrapTable;
const TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class SelectedPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {
        id: "",
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        age: "",
        gender: "",
        date: "",
        note: ""
      },
      procedures: new Map(),
      procedureData: null,
      procedureList: [],
      procedureDate: "",
      isUpdated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleProCheckbox = this.handleProCheckbox.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleProcedureDate = this.handleProcedureDate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updatePatientProcedureList = this.updatePatientProcedureList.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
  }
  componentDidMount() {
    //set the state
    this.setState({
      patient: this.props.patient
    });

    //use state and retrieve data
    this.updatePatientProcedureList();
  }
  handleGender(target) {
    if (
      target.value === "male" ||
      target.value === "female" ||
      target.value === "other"
    ) {
      return "gender";
    } else {
      return target.name;
    }
  }
  handleChange(event) {
    this.setState({
      isUpdated: false
    });
    const patient = this.state.patient;
    var name = this.handleGender(event.target);
    patient[name] = event.target.value;
    this.setState({
      patient: patient
    });
  }
  handleDate() {}
  updatePatient(e) {
    e.preventDefault();

    for (const item of this.state.procedures) {
      var key = item[0];
      var number = key.substring(1);

      var prokey = `prokey${number}`;
      var prikey = `prikey${number}`;

      var proValue = $(`#${prokey}`).val();
      var priValue = $(`#${prikey}`).val();

      this.state.procedures.get(key)["note"] = proValue;
      this.state.procedures.get(key)["price"] = priValue;
    }
    var selectedPro = [];
    for (const item of this.state.procedures) {
      if (item[1].isChecked) {
        selectedPro.push(item[1]);
      }
    }

    var files = $("#procedureImages")[0].files;

    //update patient info
    var p = new Patient();
    p.updatePatientInfo(this.state.patient);

    //add new procedure for patient

    p.addPatientProcedure(
      this.state.patient,
      this.state.procedureDate,
      selectedPro,
      files
    );

    this.setState({
      isUpdated: true
    });
    this.updatePatientProcedureList();
  }
  updatePatientProcedureList() {
    var self = this;
    var p = new Patient();
    var id = this.props.patient.id;
    p.getProcedureByPatientID(id, function(data) {
      self.setState({ procedureData: data });
    });

    p.getProcedureList(function(allData) {
      self.setState({ procedureList: allData });
    });
  }

  onRowClick(row) {
    //create a new window
    var childWindow = new BrowserWindow({
      width: 800,
      height: 600
    });
    // and load the index.html of the app.
    childWindow.loadURL(`file://${dirName}/case.html`);
    childWindow.webContents.on("did-finish-load", () => {
      var selectedProcedure = {
        row: row,
        storageID: this.props.patient.storageID
      };
      childWindow.webContents.send("sendData", selectedProcedure);
    });
    // childWindow.webContents.openDevTools();
  }
  handleProcedureDate(date) {
    this.setState(function(prev) {
      prev.procedureDate = date.toDateString();
      prev.isUpdated = false;
    });
  }
  handleProCheckbox(e) {
    this.setState({
      isUpdated: false
    });

    const key = e.target.name;
    const value = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      procedures: prevState.procedures.set(key, {
        isChecked: isChecked,
        name: value
      })
    }));
  }
  handleDelete() {
    this.props.handleDelete();
  }
  onDeleteRow(rows) {
    debugger
  }

  render() {
    const {
      id,
      firstName,
      lastName,
      mobile,
      gender,
      email,
      note,
      date,
      age
    } = this.state.patient;
    const options = {
      onRowClick: this.onRowClick,
      onDeleteRow: this.onDeleteRow
    };
    const selectRow = {
      mode: 'radio' //radio or checkbox
    };

    return (
      <div className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-11 col-sm-11 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle" />
              <h3 className="page-title">
                {firstName} {lastName}
              </h3>
            </div>
            <div className="col-1 col-sm-1 text-center text-sm-right mb-0">
              <span className="text-uppercase page-subtitle" />
              <h6 className="delete" onClick={this.handleDelete}>
                Delete
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-small mb-4">
                <div className="card-header border-bottom">
                  <h6 className="m-0">Details</h6>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item p-3">
                    <div className="row">
                      <div className="col">
                        <form onSubmit={e => this.updatePatient(e)}>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="feFirstName">First Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="feFirstName"
                                name="firstName"
                                onChange={this.handleChange}
                                placeholder="First Name"
                                value={firstName}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="feLastName">Last Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="feLastName"
                                name="lastName"
                                onChange={this.handleChange}
                                placeholder="Last Name"
                                value={lastName}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="feMobile">Mobile</label>
                              <input
                                type="text"
                                className="form-control"
                                id="feMobile"
                                name="mobile"
                                onChange={this.handleChange}
                                placeholder="Mobile"
                                value={mobile}
                              />
                            </div>

                            <div className="form-group col-md-6">
                              <label htmlFor="feEmailAddress">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                id="feEmailAddress"
                                placeholder="Email"
                                name="email"
                                onChange={this.handleChange}
                                value={email}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="feGender">Gender</label>
                              <div className="form-group">
                                <div className="form-check form-check-inline">
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio1"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      onChange={this.handleChange}
                                      name="inlineRadioOptions"
                                      id="inlineRadio1"
                                      value="female"
                                      checked={
                                        gender == "female" ? true : false
                                      }
                                    />
                                    Female
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio2"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      onChange={this.handleChange}
                                      name="inlineRadioOptions"
                                      id="inlineRadio2"
                                      value="male"
                                      checked={gender == "male" ? true : false}
                                    />
                                    Male
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio3"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      onChange={this.handleChange}
                                      name="inlineRadioOptions"
                                      id="inlineRadio3"
                                      value="other"
                                      checked={gender == "other" ? true : false}
                                    />
                                    Other
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="feAge">Age</label>
                              <input
                                type="text"
                                className="form-control"
                                id="feAge"
                                name="age"
                                onChange={this.handleChange}
                                placeholder="Age"
                                value={age}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="feDate">First Visit Date</label>
                              <br />
                              <DayPickerInput
                                onDayChange={this.handleDate}
                                value={date}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label htmlFor="feNote">Note</label>
                              <textarea
                                className="form-control"
                                name="feNote"
                                rows="5"
                                name="note"
                                onChange={this.handleChange}
                                value={note}
                              />
                            </div>
                          </div>

                          <br />

                          <div className="form-row">
                            <div className="col-sm-10">
                              <label htmlFor="feDate">Past Procedure(s)</label>

                            </div>
                            <div className="col-1 col-sm-2 text-center text-sm-right mb-0">
                              <span className="text-uppercase page-subtitle" />
                              <h6
                                className="refresh"
                                onClick={this.updatePatientProcedureList}
                              >
                                Refresh
                              </h6>
                            </div>
                          </div>
                          <div>
                            <div className="col-md-12">
                              <BootstrapTable
                                data={this.state.procedureData}
                                deleteRow
                                selectRow={ selectRow }
                                striped
                                hover
                                options={options}
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
                                  Name
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="note"
                                  filter={{ type: "TextFilter" }}
                                >
                                  Note
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="price"
                                  filter={{ type: "TextFilter" }}
                                >
                                  Price
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="date"
                                  filter={{ type: "TextFilter" }}
                                >
                                  Date
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="storageID"
                                  filter={{ type: "TextFilter" }}
                                >
                                  Case #
                                </TableHeaderColumn>
                                
                              </BootstrapTable>
                            </div>
                          </div>

                          <br />
                          <div className="form-row">
                            <div className="col-md-12">
                              <label htmlFor="feDate">Add Procedure(s)</label>
                            </div>
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="feDate">Procedure Date</label>
                            <br />
                            <DayPickerInput
                              onDayChange={this.handleProcedureDate}
                            />
                          </div>

                          <div className="form-row" id="procedure">
                            {this.state.procedureList.map(item => (
                              <Procedure
                                key={item.id}
                                id={item.id}
                                isChecked={this.state.procedures.get(item.name)}
                                labelName={item.name}
                                handleProCheckbox={this.handleProCheckbox}
                              />
                            ))}
                          </div>

                          <div className="form-row">
                            <div className="col-md-12">
                              <label>Images</label>
                            </div>
                          </div>
                          <div className="form-row">
                            <input
                              type="file"
                              className="form-control"
                              id="procedureImages"
                              multiple
                            />
                          </div>
                          <br />
                          <div className="form-row">
                            <div className="col-sm-12">
                              <button type="submit" className="btn btn-accent">
                                Update
                              </button>
                            </div>
                          </div>
                          <br />
                          <div className="form-row">
                            <div className="col-sm-12">
                              <p>
                                {this.state.isUpdated
                                  ? "The profile has been updated."
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SelectedPatient;
