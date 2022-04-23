const express = require('express')

const root = require('./routes/root')


const app = express()
const port = process.env.PORT || 3000

app.use('/', root)

app.listen(port, () => {
    console.log(`NSFW Backend listening on port ${port}`)
})
