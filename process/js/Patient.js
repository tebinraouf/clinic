/* eslint-disable */

const documentPath = "/Users/Tebin/Documents/";
const mysql = require('mysql');


class Patient {

  constructor() {

  }
  //Create new patient account
  createAccount(patientObjc, procedures, files) {
    this.initialize();

    //new id for user
    var id = this.getDateForID();

    //create patient image folder for the first time
    var newPatientPath = this.createNewPatientPath(id);

    //copy images to the newly created folder
    this.copyPatientImages(files, newPatientPath);

    //store patient info and image locations in database 
    this.insertIntoDatabase(patientObjc, procedures, id);
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
  createNewPatientPath(id) {
    var path = `${documentPath}DrTanyaPatients/${id}`;
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
  insertIntoDatabase(objc, procedures, id) {
    //connection is defined in index.html
    var sql = `INSERT INTO Patient (firstName, lastName, mobile, email, gender, note, storageID, date) VALUES ('${objc.firstName}', '${objc.lastName}', '${objc.mobile}', '${objc.email}', '${objc.gender}', '${objc.note}', '${id}', '${objc.date}')`;

    var lastID;
    var query = connection.query(sql, function (error, results) {
      if (error) throw error;
      lastID = results.insertId


      procedures.forEach(element => {
        var proSQL = `INSERT INTO mydb.Procedure (name, note, price, date, storageID, PatientID) VALUES ('${element.name}','${element.note}','${element.price}','${objc.date}','case1',${lastID});`
  
        connection.query(proSQL, function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
      });


      console.log('Inserted.');
    });

    


  }

  //get all patients
  getAll(data) {
    connection.query("SELECT * FROM Patient ORDER BY id DESC", function (err, result, fields) {
      if (err) throw err;
      data(result);
    });
  }
  //get procedures
  getProcedureByPatientID(id, data) {
    connection.query(`SELECT * FROM mydb.Procedure WHERE PatientID = ${id}`, function (err, result, fields) {
      if (err) throw err;
      data(result);
    });
  }

  getNewID() {
    return "hello again";
  }

  //Utility Methods
  getDateForID() {
    var date = new Date();
    return date.getMilliseconds().toString() + date.getMinutes().toString() + date.getHours().toString() + date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();
  }
}


module.exports = Patient;