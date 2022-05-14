const express = require('express');
const accountRouter = express.Router();
const database = require('../databaseConfig');

accountRouter.get('/',(req, res) =>{
    try {
        database.query('SELECT * FROM Account', (error, results) => {
            if(error){
                return res.send({error:true, message: error.message});
            }else{
                return res.send({error: false, data: results, message: "View all account: success"});
            }
        })
    } catch (error) {
        console.log(error.message)
        res.send
    }
})

module.exports = accountRouter;