/* eslint-disable */

const documentPath = "/Users/Tebin/Documents/";

class Patient {

  constructor() {
    this.initialize();
  }



  initialize() {
    //create the first dir if not exist
    var path = `${documentPath}DrTanyaPatients`;

    if (!fs.existsSync(path)) {
      fs.mkdir(path, {
        recursive: true
      }, err => {
        if (err) throw err;
      });
    }
  }

  getNewID() {
    return "hello again";
  }
}


module.exports = Patient;