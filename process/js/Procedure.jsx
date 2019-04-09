/* eslint-disable */
import React, { Component } from 'react';
const Cleave = require("cleave.js/react");

class Procedure extends Component {
  render() {
    return (
      <div className="form-group col-md-3">
        <div className="custom-control custom-checkbox mb-1">
          <input
            type="checkbox"
            className="custom-control-input"
            id={"p" + this.props.id}
            checked={this.props.isChecked}
            onChange={this.props.handleProCheckbox}
            name={"p" + this.props.id}
            value={this.props.labelName}
          />
          <label className="custom-control-label" htmlFor={"p" + this.props.id}>
            {this.props.labelName}
          </label>
          <input
            type="text"
            className="form-control"
            id={"prokey" + this.props.id}
            placeholder="note"
          />
          {/* <input
            type="text"
            className="form-control"
            id={"prikey"+this.props.id}
            placeholder="price"
            onChange={this.props.handleOnChangePrice}
          /> */}
          <Cleave
            placeholder="price"
            className="form-control"
            id={"prikey" + this.props.id}
            options={{ numeral: true }}
          />
        </div>
      </div>
    );
  }
}

export default Procedure;
