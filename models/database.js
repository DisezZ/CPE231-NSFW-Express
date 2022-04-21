const mysql = require('mysql')
const config = require('../config/database.json').deploy

const connection = mysql.createPool({...config, connectionLimit: 100})

module.exports = connection