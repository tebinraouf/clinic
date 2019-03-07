/* eslint-disable */
const React = require("react");
const Patient = require("./Patient");

class PatientCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePaths: new Array(),
      procedure: {},
      patientStorageID: ""
    };
    this.onImageDelete = this.onImageDelete.bind(this);
    this.onAddPhoto = this.onAddPhoto.bind(this);
  }
  componentDidMount() {
    var self = this;
    ipc.on("sendData", function(event, arg) {
      console.log(arg);
      var procedure = arg.row;
      self.setState({
        procedure: procedure,
        patientStorageID: arg.storageID
      });

      if (fs.existsSync(documentPath)) {
        var path = `${documentPath}/${arg.storageID}/${arg.row.storageID}`;
        // console.log(path);
        if (fs.existsSync(path)) {
          fs.readdir(path, (err, files) => {
            files.forEach(file => {
              if (file !== ".DS_Store") {
                let absPath = `${path}/${file}`;
                let paths = self.state.imagePaths;
                paths.push(absPath);
                self.setState({
                  imagePaths: paths
                });
              }
            });
          });
        }
      }
    });
  }

  onImageDelete(path) {
    fs.unlinkSync(path);
    window.location.reload();
  }
  onAddPhoto() {
    var files = $("#procedureImages")[0].files;
    var p = new Patient();
    debugger;
    let path = `${documentPath}/${this.state.patientStorageID}/${
      this.state.procedure.storageID
    }`;
    p.copyPatientImages(files, path);
    window.location.reload();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{this.state.procedure.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {this.state.procedure.date}
                </h6>
                <p className="card-text">{this.state.procedure.note}</p>
                <div id="images">
                  {this.state.imagePaths.map(x => (
                    <div key={x}>
                      <img src={x} width="600" /> <br />
                      <div
                        className="btn-group btn-group-sm"
                        onClick={() => this.onImageDelete(x)}
                      >
                        <button className="btn btn-warning react-bs-table-del-btn">
                          <span>
                            <i className="fa glyphicon glyphicon-trash fa-trash" />{" "}
                            Delete
                          </span>
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <div>
                  <h6>Add New Photos</h6>
                  <input
                    type="file"
                    className="form-control"
                    id="procedureImages"
                    multiple
                  />
                  <br />
                  <button className="btn btn-primary" onClick={this.onAddPhoto}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PatientCase;
