const mysql = require('mysql')

const config = require('../config/database.json').deploy
const pool = mysql.createPool({...config, connectionLimit: 100})

exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('Connected as ID:' + connection.threadId)
        //res.send('Hello nsfw')
        connection.query('select * from Membership', (err, results) => {
            connection.release()
            if (err) res.send('Error Loading!' + err.message)
            else {
                res.send(results)
            }
        })
    })
}