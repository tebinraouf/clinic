/* eslint-disable */
const React = require('react');
const PropTypes = require('prop-types');


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
    };
  }

  render() {
    const { name, password, handleNameChange, handlePassChange, handleButton } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Dr Tanya Clinic
                </h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputName"
                      value={name}
                      onChange={handleNameChange}
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
                      value={password}
                      onChange={handlePassChange}
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
                    onClick={e => handleButton(e)}
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
SignIn.propTypes = {
  name: PropTypes.string,
  password: PropTypes.string,
  handleButton: PropTypes.func,
  handlePassChange: PropTypes.func,
  handleNameChange: PropTypes.func,
};

SignIn.defaultProps = {
  name: '',
  password: '',
  handleButton: () => {},
  handlePassChange: () => {},
  handleNameChange: () => {},
};


module.exports = SignIn;
