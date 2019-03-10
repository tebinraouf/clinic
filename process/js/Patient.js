/* eslint-disable */

// const documentPath = "/Users/Tanya/Documents/";
var documentPath = "";
fullname().then(name => {
  documentPath = `/Users/${name}/Documents/`
});

class Patient {

  constructor() {

  }
  getDocumentPath() {
    return documentPath;
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
  //get all procedure types
  getProcedureTypes(data) {
    connection.query("SELECT * FROM mydb.ProcedureList;", function (err, result, fields) {
      if (err) throw err;
      data(result);
    });
  }

  //get procedure by id
  getProcedureByID(id, data) {
    connection.query(`SELECT * FROM mydb.Procedure WHERE id = ${id}`, function (err, result, fields) {
      if (err) throw err;
      data(result[0]);
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
      } else {
        data(1);
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
  //delete procedure
  deleteProcedureByID(id, callback) {
    var sql = `DELETE FROM mydb.Procedure WHERE id = ${id}`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      callback(true)
    });
  }
  //delete procedure type by id
  deleteProcedureTypeByID(id, callback) {
    var sql = `DELETE FROM mydb.ProcedureList WHERE id = ${id}`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      callback(true)
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


  //Graphs
  getGenderCounts(callback) {
    var sql = `SELECT count(*) as 'value', gender as 'name' FROM mydb.Patient GROUP BY gender;`
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result)
    });
  }
  getPatientByMonthYear(month, year, callback) {
    var sql = `SELECT count('date') as 'value', substring(date,9,2) as 'name' FROM mydb.Patient
    WHERE date like '%${year}%' and date like '%${month}%'
    GROUP BY date;`;

    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result)
    });
  }
  getPatientByAge(callback) {
    var sql = `SELECT name, count(*) AS value 
    FROM (SELECT
        CASE WHEN age BETWEEN 0 AND 9 THEN '0 to 9'
        WHEN age BETWEEN 10 and 19 THEN '10 to 19'
        WHEN age BETWEEN 20 and 29 THEN '20 to 29'
        WHEN age BETWEEN 30 and 39 THEN '30 to 39'
        WHEN age BETWEEN 40 and 49 THEN '40 to 49'
        WHEN age BETWEEN 50 and 59 THEN '50 to 59'
        WHEN age >= 60 THEN '60+' END AS name
        FROM Patient) Patient
    GROUP BY name ORDER BY name ASC`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result)
    });
  }
  getProcedureByTypeCount(callback) {
    var sql = `SELECT count(name) 'value', name FROM mydb.Procedure GROUP BY name;`
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result)
    });
  }
  getPatientYear(callback) {
    var sql = `SELECT name year FROM (
      SELECT count('date') as 'value', substring(date,12,4) as 'name' FROM mydb.Patient
      GROUP BY date)
      Patient GROUP BY name;`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result)
    });
  }
  getTotalPatientPerMonthYear(month, year, callback) {
    var sql = `Select count(value) as total FROM (
      SELECT count('date') as 'value', substring(date,9,2) as 'name' FROM mydb.Patient
          WHERE date like '%${year}%' and date like '%${month}%'
          GROUP BY date
          ) Patient;`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(result[0].total)
    });
  }




}


module.exports = Patient;