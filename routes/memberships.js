const express = require('express')
const router = express.Router()

const customerController = require('../controller/customer')

router.get('/')
router.get('/:id')

router.post('/')

module.exports = router