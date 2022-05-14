const express = require('express');
const topupRouter = express.Router();
const database = require('../databaseConfig');

//------[get all user information] 
topupRouter.post('/mobile',(req, res) =>{
    let fromAccountId = req.body.fromAccountId;
    let amount = req.body.amount;
    let mobNumber = req.body.mobNumber;
    
    if(!fromAccountId || !amount || !mobNumber)
    {
        return res.send({error: false, message:'PLease insert information (/topupTransApi)'});
    }else{
        database.query(`SELECT * FROM account WHERE account_id = ${fromAccountId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error ocur in sql statement (/topupTransApi)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found account:'+ fromAccountId + 'in accout table(/topupTransApi)'});
            }else{
                if((results[0].balance - amount) < 0)
                {
                    return res.send({error: false, message: 'Money in Account:'+ fromAccountId + ' is not enough (/topupTransApi)'});
                }else{
                    database.query(`START TRANSACTION;`
                                    + `UPDATE account SET balance = balance - ${amount} , created = created WHERE account_id = ${fromAccountId};`
                                    + `INSERT INTO topuptransaction (from_account_id,mobile_number,amount,transaction_status_id) VALUES (${fromAccountId},${mobNumber},${amount},3);`
                                    + `COMMIT;`
                                    , (error, results) => {
                        if(error){
                            //throw error;
                            return res.send({error: error, data: results, message: 'Error ocur in starttransaction mysql statement (/topupTransApi)'});
                        }else{
                            return res.send({error: false, data: results, message: 'Topup from account:'+ fromAccountId +'on number:'+ mobNumber +': Success (TopupApi)'});
                        }
                    })
                }
            }
        })
    }
})

module.exports = topupRouter;