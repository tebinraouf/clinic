/* eslint-disable */
const React = require("react");

class Procedure extends React.Component {


  render() {
    return (
      <div className="form-group col-md-3">
        <div className="custom-control custom-checkbox mb-1">
          <input
            type="checkbox"
            className="custom-control-input"
            id={this.props.chkName}
            checked={this.props.isChecked}
            onChange={this.props.handleProCheckbox}
            name={this.props.chkName}
          />
          <label className="custom-control-label" htmlFor={this.props.chkName}>
            {this.props.labelName}
          </label>
          <input
            type="text"
            className="form-control"
            name={this.props.prokey}
            placeholder="note"
            onChange={this.props.handleProNote}
            disabled={this.props.isChecked == "true" ? "false" : "true"}
          />
          <input
            type="text"
            className="form-control"
            name={this.props.prikey}
            placeholder="price"
            onChange={this.props.handleProPrice}
            disabled
          />
        </div>
      </div>
    );
  }
}


module.exports = Procedure;