const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('get users')
})

router.post('/', (req, res) => {
    res.send('post users')
})

router.get('/:user_id', (req, res) => {
    res.send('get user ' + req.params.user_id)
})

router.put('/:user_id', (req, res) => {
    res.send('put user ' + req.params.user_id)
})

router.delete('/:user_id', (req, res) => {
    res.send('delete user ' + req.params.user_id)
})

module.exports = router