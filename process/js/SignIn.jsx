const React = require('react');

class SignIn extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Dr Tanya Clinic Portal Sign In
                </h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputName"
                      value={this.props.name}
                      onChange={this.props.handleChange}
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                    <label htmlFor="inputName">Name</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      value={this.props.password}
                      onChange={this.props.handleChange}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.props.handleButton}
                  >
                    Sign in
                  </button>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SignIn;
