/* eslint-disable */
const React = require("react");
const Procedure = require("./Procedure.jsx");
const jquery = require("jquery");
const Patient = require("./Patient");
const $ = jquery;
const DayPickerInput = require("react-day-picker/DayPickerInput").default;
// import DayPicker from 'react-day-picker';

var patientObj = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  price: "",
  date: "",
  note: ""
};

class AddPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientObj: {
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
      procedureList: [],
      isSaved: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.createPatient = this.createPatient.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleProCheckbox = this.handleProCheckbox.bind(this);

    this.handleUploadingPictures = this.handleUploadingPictures.bind(this);
    this.addPatientAgain = this.addPatientAgain.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }
  componentDidMount() {
    //use state and retrieve data
    var self = this;
    var p = new Patient();
    p.getProcedureList(function(allData) {
      self.setState({ procedureList: allData });
    });
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
    const patientObj = this.state.patientObj;
    var name = this.handleGender(event.target);
    patientObj[name] = event.target.value;
    this.setState({
      patientObj: patientObj
    });
  }
  handleProCheckbox(e) {
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

  handleUploadingPictures() {
    debugger;
    var files = $("#procedureImages")[0].files;
    for (var i = 0; i < files.length; i++) {
      fs.copy(files[i].path, `${documentPath}${files[i].name}`)
        .then(() => console.log("success!"))
        .catch(err => console.error(err));
      console.log(files[i].name);
    }
  }

  handleDate(date) {
    this.setState(function(prev) {
      prev.patientObj.date = date.toDateString();
    });
  }

  createPatient(e) {
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

    //create a patient dir by date
    let patient = new Patient();
    patient.createAccount(this.state.patientObj, selectedPro, files);
    this.setState({
      isSaved: true
    });
  }

  addPatientAgain() {
    this.setState({
      isSaved: false
    });
  }

  render() {
    if (this.state.isSaved) {
      return (
        <div className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
          <div className="main-content-container container-fluid px-4">
            <div className="col-12 col-sm-12 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle" />
              <h3 className="page-title">
                The new patient has been added.{" "}
                <span onClick={this.addPatientAgain} id="addPatientAgain">
                  {" "}
                  Add a new patient!
                </span>
              </h3>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-12 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle" />
              <h3 className="page-title">New Patient Profile</h3>
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
                        <form onSubmit={e => this.createPatient(e)}>
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
                                placeholder="Age"
                                name="age"
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="feDate">Date</label>
                              <br />
                              <DayPickerInput onDayChange={this.handleDate} />
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
                              />
                            </div>
                          </div>

                          <hr />

                          <div className="form-row">
                            <div className="col-md-12">
                              <label htmlFor="feDate">Procedure</label>
                            </div>
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
                                Create
                              </button>
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

module.exports = AddPatient;
