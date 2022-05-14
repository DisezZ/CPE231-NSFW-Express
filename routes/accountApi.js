const express = require('express');
const accountRouter = express.Router();
const database = require('../databaseConfig');

//------[get all user information] 
accountRouter.get('/',(req, res) =>{
    /*
    let userSearch = req.body.userName
    if(!userSearch)
    {
        return res.status(400).send({error: true, message: "please insert information (problem occur on userApi.js)"});
    }*/
    database.query('SELECT * FROM Account', (error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Error occur in login mysql statemet (/account)'});
        }else{
            return res.send({error: false, data: results, message: "View all account: success"});
        }
    })
})

module.exports = accountRouter;