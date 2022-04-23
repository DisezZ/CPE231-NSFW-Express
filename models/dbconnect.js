const connection = require('./database')
const config = require('../config/database.json').deploy


const getConnection = async (callback) => {
    try {
        connection.connect()
        console.log(`MySQL Database connected to ${config.database}`)
    } catch (error) {
        console.log('MySQL Database connection failed:')
        console.log(`Error: ${error.message}`)
    }
}

module.exports = connectDatabase