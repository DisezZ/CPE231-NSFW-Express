const express = require('express');
const atmRouter = express.Router();
const database = require('../databaseConfig');

//------[Atm depoit] 
atmRouter.post('/deposit',(req, res) =>{
    let accountId = req.body.accountId
    let depAmount = req.body.depAmount

    if (!accountId || !depAmount){
        return res.status(400).send({error: true, message: "Please insert information (atmApi/deposit)"});
    }else{
        database.query(`SELECT * FROM Account WHERE account_id = ${accountId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error ocur in SELECT * FROM mysql statement (/atmApi/deposit/Api)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found account:'+ accountId + 'in accout table(/topupTransApi)'});
            }else{
                database.query(`START TRANSACTION;`  
                                + `UPDATE Account SET balance = balance + ${depAmount}, created = created WHERE account_id = ${accountId};`
                                + `INSERT INTO ATMTransaction (from_account_id,atm_id,amount,transaction_status_id) VALUES (${accountId},1,${depAmount},3);`
                                + `COMMIT;`
                ,(error, results) => {
                    if(error){
                        return res.send({error: error, data: results, message: 'Error ocur in START TRANSACTION mysql statement (/atmApi/deposit)'});
                    }else{
                        return res.send({error: false, data: results, message: "Deposit to atm: success"});
                    }
                })
            }
        })          
    }
})

//------[Atm withdraw] 
atmRouter.post('/withdraw',(req, res) =>{
    let accountId = req.body.accountId
    let withAmount = req.body.withAmount

    if (!accountId || !withAmount){
        return res.status(400).send({error: true, message: "please insert information(api/ATM/withdraw)"});
    }else{
        database.query(`SELECT * FROM Account WHERE account_id = ${accountId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error ocur in SELECT * FROM mysql statement (/atmApi/withdraw/Api)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found account:'+ accountId + 'in accout table(api/ATM/withdraw)'});
            }
            if((results[0].balance - withAmount) < 0)
            {
                return res.send({error: false, message: 'Money in Account:'+ accountId + ' is not enough to withdraw (api/ATM/withdraw)'});
            }else{
                database.query(`START TRANSACTION;`  
                                + `UPDATE Account SET balance = balance - ${withAmount}, created = created WHERE account_id = ${accountId};`
                                + `INSERT INTO ATMTransaction (from_account_id,atm_id,amount,transaction_status_id) VALUES (${accountId},1,${0-withAmount},3);`
                                + `COMMIT;`
                ,(error, results) => {
                    if(error){
                        return res.send({error: error, data: results, message: 'Error ocur in START TRANSACTION mysql statement (/atmApi/withdraw/Api)'});
                    }else{ 
                        return res.send({error: false, data: results, message: "withdraw on atm: success"});
                    }
                })
            }
        })
    }
})
/*
atmRouter.post('/deposits',(req, res) =>{
    let sqlCom = `START TRANSACTION;` + 
                    `UPDATE account SET balance = balance + 50 WHERE account_id = 2;` +
                    `INSERT INTO user (position_id,first_name,last_name,date_of_birth,email,mobile_number,address,sex,username,password) VALUES (3,'arima','test_lastname','1995-01-1','testuser@email.com','0000000001','street 22 ass.2','M','testuser','test1234');` +
                    `COMMIT;`
    database.query(sqlCom ,(error, results) => {
        if(error){
            throw error;
        }else{
            return res.send({error: false, data: results, message: "Deposit to atm: success"});
        }
    })
})
*/
module.exports = atmRouter;