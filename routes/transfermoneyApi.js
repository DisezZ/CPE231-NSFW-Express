const express = require('express');
const transferRouter = express.Router();
const database = require('../databaseConfig');

//-----------[Transfer money]----------  
transferRouter.post('/transferApi',(req, res) =>{
    let fromAccountId = req.body.fromAccountId
    let toAccountId = req.body.toAccountId
    let transAmount = req.body.transAmount

    if (!fromAccountId || !toAccountId || !transAmount){
        return res.status(400).send({error: true, message: "please insert information(trasfermoneyApi/transferApi)"});
    }else{
        database.query(`SELECT * FROM account WHERE account_id = ${fromAccountId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error ocur in SELECT * FROM mysql statement (/transferApi)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found account:'+ fromAccountId + 'in accout table (trasfermoneyApi/transferApi)'});
            }
            if(results[0].balance - transAmount < 0){
                return res.send({error: false,  message: 'Your account:'+ fromAccountId + 'can not transfer becasue not enough of money (trasfermoneyApi/transferApi)'});
            }else{
                database.query(`SELECT * FROM account WHERE account_id = ${toAccountId};`, (error, results) => {
                    if(error){
                        //throw error;
                        return res.send({error: error, data: results, message: 'Error ocur in SLECT * FROM mysql statement (/transferApi)'});
                    }
                    if (results === undefined || results.length == 0){
                        return res.send({error: false, data: results, message: 'Not found account:'+ toAccountId + 'in accout table(trasfermoneyApi/transferApi)'});
                    }else{
                        database.query(`START TRANSACTION;`  
                        + `UPDATE account SET balance = balance - ${transAmount} , created = created WHERE account_id = ${fromAccountId};`
                        + `UPDATE account SET balance = balance + ${transAmount} , created = created WHERE account_id = ${toAccountId};`
                        + `INSERT INTO transfertransaction (from_account_id,to_account_id,amount,transaction_status_id) VALUES (${fromAccountId},${toAccountId},${transAmount},3);`
                        + `COMMIT;`
                        ,(error, results) => {
                            if(error){
                                return res.send({error: error, data: results, message: 'Error ocur in starttransaction mysql statement (/transferApi)'});
                            }else{ 
                                return res.send({error: false, data: results, message: "Transfer from:"+ fromAccountId +"to:" + toAccountId + ": success"});
                            }
                        })
                    }
                })
            }
        })
    }
})

module.exports = transferRouter;