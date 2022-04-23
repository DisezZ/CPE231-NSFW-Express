const express = require('express')

const membershipController = require('../controllers/membershipController')
const users = require('./users')

const router = express.Router()

router.get('/', membershipController.view)
router.use('/users', users)

module.exports = router