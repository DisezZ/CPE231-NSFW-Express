const mysql = require('mysql')

const config = require('./database.json')
const databaseConfig = config.remotesql
const connection = mysql.createConnection(databaseConfig)

exports.connect = connection.connect((err) => {
    if (err) {
        console.log(`Failed to connect database ${databaseConfig.database} on ${databaseConfig.host} with port ${databaseConfig.port}`)
        throw err
    } else {
        console.log(`Connected to ${databaseConfig.database} on ${databaseConfig.host} with port ${databaseConfig.port}`)
    }
});

module.exports = connection