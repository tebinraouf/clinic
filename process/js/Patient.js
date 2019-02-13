/* eslint-disable */

// const documentPath = "/Users/Tanya/Documents/";
var documentPath = "";
fullname().then(name => {
  documentPath = `/Users/${name}/Documents/`
});

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
    path += "/case1"
    if (!fs.existsSync(path)) {
      fs.mkdir(path, err => {
        if (err) throw err;
      });
    }
    return path;
  }
  copyPatientImages(files, path) {
    for (var i = 0; i < files.length; i++) {
      fs.copy(files[i].path, `${path}/${files[i].name}`)
        .then(() => console.log("success!"))
        .catch(err => console.error(err));
      console.log(files[i].name);
    }
  }
  insertIntoDatabase(objc, procedures, id) {
    //connection is defined in index.html
    var sql = `INSERT INTO Patient (firstName, lastName, mobile, email, gender, note, storageID, date, age) VALUES ('${objc.firstName}', '${objc.lastName}', '${objc.mobile}', '${objc.email}', '${objc.gender}', '${objc.note}', '${id}', '${objc.date}', ${objc.age})`;

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
  //add procedure to procedureList table
  addProcedure(name) {
    connection.query(`INSERT INTO ProcedureList (name) VALUES ('${name}')`, function (error, results) {
      if (error) throw error;
    });
  }
  getProcedureList(data) {
    connection.query("SELECT * FROM ProcedureList", function (err, result, fields) {
      if (err) throw err;
      data(result);
    });
  }

  //update patient info
  updatePatientInfo(data) {
    const sql = `UPDATE Patient SET firstName = "${data.firstName}", lastName = "${data.lastName}", mobile="${data.mobile}", gender="${data.gender}", email="${data.email}", note="${data.note}", date="${data.date}", age=${data.age} WHERE id= ${data.id};`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }
  createNewCaseForPatient(storageID, newID) {
    var path = `${documentPath}DrTanyaPatients/${storageID}/${newID}`;
    if (!fs.existsSync(path)) {
      fs.mkdir(path, err => {
        if (err) throw err;
      });
    }
    return path;
  }
  //add procedure to existing patient
  addPatientProcedure(patient, procedureDate, procedures, files) {
    var self = this;
    this.getLastCaseID(patient.id, function (newCaseID) {
      //create folder for case images
      var path = self.createNewCaseForPatient(patient.storageID, `case${newCaseID}`);
      //copy uploaded images
      self.copyPatientImages(files, path);

      //add procedures to database
      procedures.forEach(element => {
        var proSQL = `INSERT INTO mydb.Procedure (name, note, price, date, storageID, PatientID) VALUES ('${element.name}','${element.note}','${element.price}','${procedureDate}','case${newCaseID}',${patient.id});`

        connection.query(proSQL, function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
      });
    })
  }


  //get latest case ID 
  getLastCaseID(patientID, data) {
    connection.query(`SELECT max(storageID) as "case" FROM mydb.Procedure WHERE patientID = ${patientID};`, function (err, result, fields) {
      if (err) throw err;

      if (result[0].case != null) {
        var id = parseInt(result[0].case.substring(4))
        var newID = id + 1;
        data(newID);
      }
    });
  }
  getLogin(callback) {
    connection.query("SELECT * FROM User", function (err, result, fields) {
      if (err) throw err;
      callback(result[0].userName, result[0].userPassword);
    });
  }
  //delete patient profile
  deletePatientProfile(id, callback) {
    connection.query(`DELETE FROM mydb.Procedure WHERE patientID = ${id}`, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);

      connection.query(`DELETE FROM mydb.Patient WHERE id = ${id}`, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        callback(true);
      });

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