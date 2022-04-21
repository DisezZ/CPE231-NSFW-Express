const express = require('express')
const mysql = require('mysql')
const config = require('./config/database.json').develop


const app = express()
const port = process.env.PORT || 3000

const pool = mysql.createPool({...config, connectionLimit: 100})
pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('Connected as ID:' + connection.threadId)
})

app.get('/', (req, res) => {
    /*database.query('SELECT * FROM tb_user', (err, res) => {
        if(err) {
            console.log("error: ", err)
            result(err, null)
            return
        }
        else{
            console.log('hello')
            return
    }
    })*/
    res.send('Hello NSFW')
})

app.listen(port, () => {
    console.log(`NSFW Backend listening on port ${port}`)
})
