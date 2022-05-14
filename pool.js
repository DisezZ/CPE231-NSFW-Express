var mysql = require ('mysql');
var databaseConfig = require('./config/database.json').remotesql

var pool = mysql.createPool(...databaseConfig);
module.exports = pool;