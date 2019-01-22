/* eslint-disable */
const React = require("react");
const jquery = require("jquery");
const $ = jquery;
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
// require("node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css");

class AddAllPatients extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var products = [
      {
        id: 1,
        name: "Product1",
        price: 120
      },
      {
        id: 2,
        name: "Product2",
        price: 80
      }
    ];
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
              <BootstrapTable data={products} striped hover>
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
                  dataField="price"
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
