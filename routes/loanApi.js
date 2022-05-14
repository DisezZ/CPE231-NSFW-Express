const express = require('express');
const { DATE } = require('mysql/lib/protocol/constants/types');
const loanRouter = express.Router();
const database = require('../databaseConfig');

//------[get all user information] 
loanRouter.get('/',(req, res) =>{
    database.query('SELECT a.account_id, m.membership_id , m.loan_amount FROM account a, membership m WHERE a.membership_id = m.membership_id AND account_id = 2;', (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Error ocur in SELECT account mysql statement (/loanApi)'});
        }else{
            console.log(results[0].loan_amount)
            return res.send({error: false, data: results, message: "View all user: success time:"+ Date()});
        }
    })
})

//------[create loan] 
loanRouter.get('/createVtwo/loanContract',(req, res) =>{
    let accountId = req.body.accountId;
    let lendAmount = req.body.lendAmount;
    let maxAccountLoan = 0;
    let accountLoanInterest = 0;
    let sumleftAmount = 0;

    if(!accountId || !lendAmount || lendAmount < 0)
    {
        return res.send({error: false, message:'PLeas insert information (/create/loanContract)'});
    }else{
        database.query(`SELECT account_id FROM account WHERE account_id = ${accountId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error ocur in SELECT account mysql statement (/create/loanContract)'});
            }
            console.log('pass:1');
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found acoount:'+ accountId + 'in account table (loanApi)'});
            }else{
                database.query(`SELECT m.loan_interest_rate, m.loan_amount FROM account a, membership m WHERE a.membership_id = m.membership_id AND account_id = ${accountId};`, (error, results) => {
                    if(error){
                        return res.send({error: error, data: results, message: 'Error ocur in SELECT query account data mysql statement (/create/loanContract)'});
                    }else{
                        if(results.length == 0){
                            return res.send({error: true, data: results, message: 'ERROR ocur when view account:'+accountId+' : loan_amount, loan_interest_rate'});
                        }else{

                            //console.log('pass:2');
                            maxAccountLoan = results[0].loan_amount;
                            //console.log('Max loan1:'+ maxAccountLoan);
                            accountLoanInterest = results[0].loan_interest_rate;
                            //console.log('accLoanInterest1:'+ accountLoanInterest);
                            database.query(`SELECT account_id FROM loan WHERE account_id = ${accountId};`, (error, results) => {
                                if(error){
                                    return res.send({error: error, data: results, message: 'Error ocur in SELECT account mysql statement (/create/loanContract)'});
                                }
                                if(results.length != 0){
                                    //console.log('pass:3');
                                    //console.log('Max loan2:'+ maxAccountLoan);
                                    database.query(`SELECT account_id, SUM(left_amount) AS accLeftAmount FROM loan WHERE account_id = ${accountId};`, (error, results) => {
                                        if(error){
                                            return res.send({error: error, data: results, message: 'Error ocur in SELECT account and sum all amout_letf mysql statement (/create/loanContract)'});
                                        }
                                        else{
                                            if(results.length == 0)
                                            {
                                                return res.send({error: true, data: results, message: 'ERROR ocur when sum(left_amout) account_id:'+accountId+'(state:4.1)'});
                                            }else{
                                                console.log('pass:3.5');
                                                sumleftAmount = results[0].accLeftAmount;
                                                maxAccountLoan = maxAccountLoan - sumleftAmount;
                                                console.log('sumLeftAmount:'+ sumleftAmount);
                                                console.log('Max loan3:'+ maxAccountLoan);
                                                console.log('pass:3.7');
                                                if((maxAccountLoan - lendAmount) < 0){
                                                console.log('pass:5');
                                                    return res.send({error: false, message: 'Your accountID:'+ accountId +' can not create loan contract becase limit amount of member'});
                                                }else{
                                                    database.query(`INSERT INTO loan (account_id,initial_amount,left_amount,interest_rate,transaction_status_id,loan_approved_by) 
                                                        VALUES (${accountId},${lendAmount},${lendAmount},${accountLoanInterest},1,1)`
                                                        , (error, results) => {
                                                        if(error){
                                                            return res.send({error: error, data: results, message: 'Error ocur when INSERT data in loan table: mysql statement fail(/create/loanContract)'});
                                                        }
                                                        if(results.length != 0){
                                                            return res.send({error: false, data: results, message: 'loan contract on account_id:'+accountId+': Success (Firsrt loan contract)'});
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }else{
                                    //console.log('Max loan4:'+ maxAccountLoan);
                                    if((maxAccountLoan - lendAmount) < 0){
                                    //console.log('Total loan lend:'+totalLoanLend);
                                    //console.log('pass:5');
                                        return res.send({error: false, message: 'Your accountID:'+ accountId +' can not create loan contract becase limit amount of member'});
                                    }else{
                                        //console.log('pass:6');
                                        //return res.send({error: false, message: 'Loan contracy: Success (Firsrt loan contract)'});
                                        database.query(`INSERT INTO loan (account_id,initial_amount,left_amount,interest_rate,transaction_status_id,loan_approved_by) 
                                                        VALUES (${accountId},${lendAmount},${lendAmount},${accountLoanInterest},1,1)`
                                            , (error, results) => {
                                            if(error){
                                                return res.send({error: error, data: results, message: 'Error ocur when INSERT single data in loan table: mysql statement fail(/create/loanContract)'});
                                            }
                                            if(results.length != 0){
                                                return res.send({error: false, data: results, message: 'loan contract on account_id:'+accountId+': Success (Firsrt loan contract)'});
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    }
})

//------[paying loan] 
loanRouter.post('/loanPaying',(req, res) =>{
    let accountId = req.body.accountId;
    let payAmount = req.body.payAmount;
    let loanId = req.body.loanId;
    let loanLeftamount = 0;

    if (!accountId || !payAmount || !loanId || payAmount < 0){
        return res.status(400).send({error: true, message: "please insert information(/loanPaying)"});
    }else{
        database.query(`SELECT * FROM account WHERE account_id = ${accountId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Error ocur in SELECT account mysql statement (/loanPaying)'});
            }
            console.log('pass: 1');
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found account:'+ accountId + 'in accout table(/loanPaying)'});
            }else{
                if (results[0].balance < payAmount)
                {
                    return res.send({error: false, data: results, message: 'Your account:'+ accountId + 'in can not paying loan because your money is not enough(/loanPaying)'});
                }else{
                    database.query(`SELECT * FROM loan WHERE account_id = ${accountId} AND loan_id = ${loanId} AND transaction_status_id = 3;`, (error, results) => {
                        if(error){
                            return res.send({error: error, data: results, message: 'Error ocur in SELECT account mysql statement (/loanPaying)'});
                        }
                        if (results === undefined || results.length == 0){
                            return res.send({error: true, data: results, message: 'Not found loan contract for paying in account:'+ accountId + '(/loanPaying)'});
                        }else{
                            console.log('pass: 2');
                            loanLeftamount = results[0].left_amount;
                            console.log('left amount:'+ loanLeftamount);
                            if((loanLeftamount - payAmount) < 0){
                                return res.send({error: true, message: 'Can not pay money more than loan contract amount left in account:'+ accountId +'with loan_id:' + loanId + ' and amount left:'+ loanLeftamount +' (/loanPaying)'});
                            }else{
                                //console.log('-----SUCKCESS-----');
                                //return res.send({error: false, message: 'loan paying sucess (/loanPaying)'});
                                console.log('pay:' + payAmount);
                                database.query(`START TRANSACTION;`
                                                +`UPDATE account SET balance = balance - ${payAmount} WHERE account_id = ${accountId};`
                                                +`UPDATE loan SET left_amount = left_amount - ${payAmount}, created = created WHERE loan_id = ${accountId};`
                                                +`INSERT INTO loanpaying (loan_id,amount,transaction_status_id) VALUES (${loanId},${payAmount},3);`
                                                +`COMMIT;`
                                    , (error, results) => {
                                    if(error){
                                        return res.send({error: error, data: results, message: 'Error ocur when START TRANSACTION mysql statement (/loanPaying)'});
                                    }
                                    if (results === undefined || results.length == 0){
                                        return res.send({error: true, data: results, message: 'Error ocur when jump in transaction state in accountid:'+ accountId + '(/loanPaying)'});
                                    }else{
                                        return res.send({error: true, data: results, message: 'loan contract paying in account:'+ accountId + 'with loan_id = ' + loanId + ' Method: Success (/loanPaying)'});
                                    }    
                                })
                            }
                        }    
                    })
                }
            }    
        })
    }
})

module.exports = loanRouter;