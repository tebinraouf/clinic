/* eslint-disable */
const React = require("react");
const jquery = require("jquery");
const $ = jquery;
import Gallery from "react-photo-gallery";
import Lightbox from "react-images";

const photos = [
  {
    src: "https://via.placeholder.com/150",
    width: 4,
    height: 3
  },
  {
    src: "https://via.placeholder.com/350",
    width: 1,
    height: 1
  }
];
class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    };
    
    this.handleAddImages = this.handleAddImages.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
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
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Gallery photos={photos} onClick={this.openLightbox} />
              <Lightbox
                images={photos}
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
