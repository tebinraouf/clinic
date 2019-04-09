/* eslint-disable */
const React = require("react");
const jquery = require("jquery");
const $ = jquery;


class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        lightboxIsOpen: false,
    }
    this.handleAddImages = this.handleAddImages.bind(this);
  }

  handleAddImages() {
    //currentWindow is defined in index.html
    dialog.showOpenDialog(
      currentWindow,
      {
        properties: ["openFile", "multiSelections"],
        filters: [
          {
            name: "Images",
            extensions: ["jpg", "png", "gif", "jpeg"]
          }
        ]
      },
      paths => {
        console.log(paths);
      }
    );
  }

  render() {
    return (
      <div className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-12 text-center text-sm-left mb-0">
              <span className="text-uppercase page-subtitle" />
              <h3 className="page-title">
                Portfolio{" "}
                <i
                  onClick={this.handleAddImages}
                  className="addToPortfolio material-icons"
                >
                  library_add
                </i>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              hello
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

module.exports = Portfolio;
