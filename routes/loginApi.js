const express = require('express');
const { DATE } = require('mysql/lib/protocol/constants/types');
const loginRouter = express.Router();
const database = require('../databaseConfig');
// check
loginRouter.post('/userLogin',(req, res) =>{
    let username = req.body.username
    let password = req.body.password

    if (!username || !password){
        return res.status(400).send({error: true, message: "Please insert information (/loginApi)"});
    }else{
        database.query(`SELECT * FROM User WHERE username = ? AND password = ?;`,[username,password], (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error occur in login mysql statemet (/login)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found username:'+ username + 'in accout table(/LoginApi)'});
            }else{
                return res.send({error: false, data: results, message: 'Found user:' + username + 'in accout table(/LoginApi)'});
            }
        })          
    }
})

module.exports = loginRouter