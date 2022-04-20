const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello NSFW')
})

app.listen(port, () => {
    console.log(`NSFW Backend listening on port ${port}`)
})
