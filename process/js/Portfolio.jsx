/* eslint-disable */
const React = require("react");
const jquery = require("jquery");
const $ = jquery;
import Gallery from "react-photo-gallery";
import Lightbox from "react-images";
import SelectedImage from "./SelectedImage";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      isEditing: false,
      photos: new Array(),
      isSelectedAll: false
    };

    this.imageLoader = this.imageLoader.bind(this);
    this.photoDisplayCreater = this.photoDisplayCreater.bind(this);

    this.handleAddImages = this.handleAddImages.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);

    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  componentDidMount() {
    this.imageLoader();
  }
  imageLoader() {
    let self = this;
    let paths = [];
    let photos = [];
    let path = `${documentPath}/portfolio`;
    if (fs.existsSync(path)) {
      fs.readdir(path, (err, files) => {
        files.forEach(file => {
          if (file !== ".DS_Store") {
            let absPath = `${path}/${file}`;
            self.photoDisplayCreater(absPath, photos => photos);
          }
        });
      });
    }
    this.setState({
      photos: photos
    });
  }

  photoDisplayCreater(destinationPath, callback) {
    let self = this;
    var img = new Image();
    img.onload = function() {
      //update the photos
      let objc = {
        src: destinationPath,
        width: img.width / 100,
        height: img.height / 100
      };
      let photos = self.state.photos;
      photos.push(objc);
      callback(photos);
    };
    img.src = destinationPath;
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
        var self = this;
        for (var i = 0; i < paths.length; i++) {
          let r = paths[i].split("/");
          let name = r[r.length - 1];
          //documentPath is global
          let destinationPath = `${documentPath}/portfolio/${name}`;
          fs.copy(paths[i], destinationPath)
            .then(() => {
              //code goes here
              self.photoDisplayCreater(destinationPath, photos => {
                self.setState({
                  photos: photos
                });
              });
            })
            .catch(err => console.error(err));
        }
      }
    );
  }
  handleEditing() {
    this.setState({
      isEditing: true
    });
  }
  handleDelete() {}
  selectPhoto(event, obj) {
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({ photos: photos });
  }
  handleSelectAll() {
    let photos = this.state.photos.map((photo, index) => {
      return { ...photo, selected: !this.state.isSelectedAll };
    });
    this.setState({
      isSelectedAll: !this.state.isSelectedAll,
      photos: photos
    });
  }
  handleDone() {
    let photos = this.state.photos.map((photo, index) => {
      return { ...photo, selected: false };
    });
    this.setState({
      isEditing: false,
      photos: photos,
      isSelectedAll: false
    });
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
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
                <i
                  onClick={this.handleEditing}
                  className="addToPortfolio material-icons"
                >
                  edit
                </i>
              </h3>
            </div>
          </div>
          {this.state.isEditing ? (
            <div className="row pb-2">
              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-warning react-bs-table-del-btn "
                  onClick={this.handleDelete}
                >
                  Delete
                </button>
              </div>
              <button
                type="button"
                className="btn btn-accent"
                onClick={this.handleSelectAll}
              >
                {!this.state.isSelectedAll ? "Select All" : "Deselect All"}
              </button>
              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={this.handleDone}
                >
                  Done
                </button>
              </div>
            </div>
          ) : null}
          <div className="row">
            <div className="col-sm-12">
              <Gallery
                photos={this.state.photos}
                onClick={
                  this.state.isEditing ? this.selectPhoto : this.openLightbox
                }
                ImageComponent={SelectedImage}
                direction={"column"}
              />
              <Lightbox
                images={this.state.photos}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default Portfolio;
