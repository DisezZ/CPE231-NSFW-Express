const express = require('express');
const billRouter = express.Router();
const database = require('../databaseConfig');


//------[view all bill transaction]
billRouter.get('/',(req, res) =>{    
    database.query(`SELECT * FROM BillingTransaction;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Error ocur in SELECT * FROM mysql statement (/billApi)'});
        }else{
            return res.send({error: false, data: results, message: "View all billing transaction: success"});
        }
    })
})

//------[create billing transaction all account information] 
billRouter.get('/create/BTransaction',(req, res) =>{
    let accountId = req.body.accountId;
    let billAmount = req.body.billAmount;
    if(!accountId || !billAmount)
    {
        return res.send({error: false, message:'PLeas insert information (/BTransaction)'});
    }else{
        database.query(`SELECT account_id FROM Account WHERE account_id = ${accountId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error ocur in SELECT account mysql statement (/BTransactions)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found acoount:'+ accountId + 'in account table(billTransApi)'});
            }else{
                database.query(`INSERT INTO BillingTransaction (from_account_id,amount,transaction_status_id) VALUES (${accountId},${billAmount},2);`, (error, results) => {
                    if(error){
                        return res.send({error: error, data: results, message: 'Error ocur when insert bill statement (/BTransactions)'});
                    }else{
                        return res.send({error: false, data: results, message: "Create bill in account_ID["+ accountId +"]: success"});
                    }
                })
            }
        })
    }
})
//------------[Get account bill by accontid]----------
billRouter.get('/get/BTransaction',(req, res) =>{
    let accountId = req.body.accountId;
    
    if(!accountId)
    {
        return res.send({error: false, message:'PLeas insert information (/get/BTransaction)'});
    }else{
        database.query(`SELECT account_id FROM Account WHERE account_id = ${accountId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error ocur in SELECT account mysql statement (/get/BTransaction)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found account:'+ accountId + 'in accout table(billTransApi)'});
            }else{
                database.query(`SELECT * FROM BillingTransaction WHERE from_account_id = ${accountId} AND transaction_status_id = 3 
                                OR from_account_id = ${accountId} AND transaction_status_id = 2 OR from_account_id = ${accountId} AND transaction_status_id = 1;`
                                , (error, results) => {
                    if(error){
                        return res.send({error: error, data: results, message: 'Error ocur in SELECT all bill in table mysql statement (/get/BTransaction)'});
                    }else{
                        if (results === undefined || results.length == 0){
                            return res.send({error: false, data: results, message: 'Not found bill transaction in account:'+ accountId + '(billTransApi)'});
                        }else{
                            return res.send({error: false, data: results, message: "View bill in account_ID["+accountId+"]: success"});
                        }
                    }
                })
            }
        })
    }
})

//----- pay bill in accout
// bill-id, account-id 


module.exports = billRouter;