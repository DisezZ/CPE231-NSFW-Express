const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const database = require('./config/database')

const app = express()
app.use(bodyParser.json());

const root = require('./routes/root')

app.use('/api', root)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`NSFW Backend listening on port ${port}`)
})
