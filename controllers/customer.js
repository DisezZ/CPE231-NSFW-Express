const database = require('../config/database')

exports.view = (req, res) => {
    database.query('SELECT * From Membership;', (err, result) => {
        res.json({"result": result, "test": req.query})
    });
}

exports.create = (req, res) => {
    
}

exports.edit = (req, res) => {
    
}