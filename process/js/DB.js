/* eslint-disable */
var mysql = require('mysql');
 
class DB {
    setup(connect) {
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root1234',
            database : 'mydb'
        });
        connection.connect();
        connect(connection);
    }
} 

module.exports = DB;