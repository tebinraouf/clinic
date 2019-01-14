/* eslint-disable */

const documentPath = "/Users/Tebin/Documents/";

class Patient {

  constructor(patientObjc, procedures, files) {
    this.initialize();
    //create patient image folder for the first time
    var newPatientPath = this.createNewPatientPath();
    
    //copy images to the newly created folder
    this.copyPatientImages(files, newPatientPath);

    //store patient info and image locations in database 
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

  createNewPatientPath() {
    var path = `${documentPath}DrTanyaPatients/${this.getDateForID()}`;
    if (!fs.existsSync(path)) {
      fs.mkdir(path, {
        recursive: true
      }, err => {
        if (err) throw err;
      });
    }
    path += "/case1/"
    if (!fs.existsSync(path)) {
      fs.mkdir(path, err => {
        if (err) throw err;
      });
    }
    return path;
  }
  copyPatientImages(files, path) {
    for (var i = 0; i < files.length; i++) {
      fs.copy(files[i].path, `${path}${files[i].name}`)
        .then(() => console.log("success!"))
        .catch(err => console.error(err));
      console.log(files[i].name);
    }
  }

  getNewID() {
    return "hello again";
  }
  getDateForID() {
    var date = new Date();
    return date.getMilliseconds().toString() + date.getMinutes().toString() + date.getHours().toString() + date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();
  }
}


module.exports = Patient;