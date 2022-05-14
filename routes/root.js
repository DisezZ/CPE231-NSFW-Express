const express = require('express')

const customerController = require('../controllers/customer')

const customerRouter = require('./users')

const router = express.Router()
router.get('/', (req, res) => res.json('hello'))

router.use('/customers', customerRouter)

module.exports = router