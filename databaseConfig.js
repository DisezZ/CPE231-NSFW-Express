const res = require('express/lib/response');
const mysql = require('mysql');
const dbConfig = require('./config/database.json').remotesql

let dbCon = mysql.createConnection(dbConfig)
dbCon.connect(function(err) {
    if (err){
        return res.send({error:err , message:'error conect database'});
    }else{
        console.log("Database is connected to API");
    }
});

module.exports = dbCon;

