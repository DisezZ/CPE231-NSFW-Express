const express = require('express')
const router = express.Router()

const customerController = require('../controllers/customer')

router.get('/', customerController.view)

router.post('/')

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