/* eslint-disable */
const React = require("react");

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
        price: "",
        gender: "",
        date: "",
        note: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.createPatient = this.createPatient.bind(this);
    this.handleGender = this.handleGender.bind(this);
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
  createPatient(e) {
    e.preventDefault();
    console.log(this.state.patientObj);
  }

  render() {
    return (
      <div className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
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
                              <label htmlFor="fePrice">Price</label>
                              <input
                                type="text"
                                className="form-control"
                                id="fePrice"
                                name="price"
                                onChange={this.handleChange}
                                placeholder="Price"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="feDate">Date</label>
                              <input
                                type="text"
                                className="form-control"
                                id="feDate"
                                name="date"
                                placeholder="Date"
                                onChange={this.handleChange}
                                value={new Date().toDateString()}
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
                              />
                            </div>
                          </div>

                          <hr />

                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="feDate">Date</label>
                              <input
                                type="text"
                                className="form-control"
                                id="feDate"
                                name="date"
                                placeholder="Date"
                                onChange={this.handleChange}
                                value={new Date().toDateString()}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="col-md-12">
                              <label htmlFor="feDate">Procedure</label>
                            </div>
                          </div>

                          <div className="form-row">
                            {/* Procedure 1 Start */}
                            <div className="form-group col-md-3">
                              <div className="custom-control custom-checkbox mb-1">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="prochk1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="prochk1"
                                >
                                  Botox
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feProcedure"
                                  name="procedure1Note"
                                  placeholder="note"
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            {/* Procedure 1 End */}

                            {/* Procedure 2 Start */}
                            <div className="form-group col-md-3">
                              <div className="custom-control custom-checkbox mb-1">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="prochk2"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="prochk2"
                                >
                                  Filler
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feProcedure"
                                  name="procedure2Note"
                                  placeholder="note"
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            {/* Procedure 2 End */}

                            {/* Procedure 3 Start */}
                            <div className="form-group col-md-3">
                              <div className="custom-control custom-checkbox mb-1">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="prochk3"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="prochk3"
                                >
                                  PRP
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feProcedure"
                                  name="procedure3Note"
                                  placeholder="note"
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            {/* Procedure 3 End */}

                            {/* Procedure 4 Start */}
                            <div className="form-group col-md-3">
                              <div className="custom-control custom-checkbox mb-1">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="prochk4"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="prochk4"
                                >
                                  Mesotherapy
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feProcedure"
                                  name="procedure4Note"
                                  placeholder="note"
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            {/* Procedure 4 End */}

                          </div>

                          <button type="submit" className="btn btn-accent">
                            Create
                          </button>
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
