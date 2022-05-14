const express = require('express');
const customerRouter = express.Router();
const database = require('../databaseConfig');


// ---------------- Account table----------------
customerRouter.get('/view/accounts',(req, res) =>{
    database.query(`SELECT * FROM account`, (error, results) => {
        if (results === undefined || results.length == 0){
            return res.send({error: true, data: results, message: 'Not found accounts in accout table(/view/accounts)'});
        }else{
            return res.send({error: false, data: results, message: 'View all account in accout table: Success (/view/accounts)'});
        }
    })          
    
})

customerRouter.get('/view/accounts/:id',(req, res) =>{
    let accountId = req.params.id;

    if (!accountId){
        return res.status(400).send({error: true, message: "Please insert information (/view/accounts/:id)"});
    }else{
        database.query(`SELECT * FROM account WHERE account_id = ${accountId};`, (error, results) => {
            if (results === undefined || results.length == 0){
                return res.send({error: true, data: results, message: 'Not found account:'+ accountId + 'in accout table(/view/accounts/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found account:'+ accountId + 'in accout table(/view/accounts/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/accounts',(req, res) =>{
    let customerId = req.body.userid;
    let branchId = req.body.branchId;
    if (!customerId || !branchId){
        return res.status(400).send({error: true, message: "Please insert information (/view/accounts)"});
    }else{
        database.query(`INSERT INTO account (customer_id,branch_id,membership_id,balance) VALUES (${customerId},${branchId},1,0);`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create  account: Mysql error statement(/view/accounts)'});
            }else{
                return res.send({error: false, data: results, message: 'Create account: Success'});
            }
        }) 
    }         
})

// ---------------- Atm table----------------
customerRouter.get('/view/atms',(req, res) =>{
    database.query(`SELECT * FROM atm`, (error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Mysql statement error (/view/atms)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found atm in atm table(/view/atms)'});
        }else{
            return res.send({error: false, data: results, message: 'View all atm in atm table: Success (/view/atms)'});
        }
    })          
    
})

customerRouter.get('/view/atms/:id',(req, res) =>{
    let atmId = req.params.id;

    if (!atmId){
        return res.status(400).send({error: true, message: "Please insert information (/view/atm/:id)"});
    }else{
        database.query(`SELECT * FROM atm WHERE atm_id = ${atmId};`, (error, results) => {
            if(error){
                return res.send({error: true, data: results, message: 'Mysql statement error (/view/atms/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found atm:'+ atmId + 'in accout table(/view/atm/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found atm:'+ atmId + 'in accout table(/view/atm/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/atms',(req, res) =>{
    let branchId = req.body.branchId;

    if (!branchId){
        return res.status(400).send({error: true, message: "Please insert information (/create/atms)"});
    }else{
        database.query(`INSERT INTO atm (branch_id) VALUES (${branchId});`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create atm: Mysql error statement(/create/atms)'});
            }else{
                return res.send({error: false, data: results, message: 'Create atm: Success(/create/atms)'});
            }
        }) 
    }         
})

// ---------------- Atm transaction table----------------
customerRouter.get('/view/atmtransactions',(req, res) =>{
    database.query(`SELECT * FROM atmtransaction`, (error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Mysql statement error (/view/atmtransactions)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found atmtransactions in atmtransactions table(/view/atmtransactions)'});
        }else{
            return res.send({error: false, data: results, message: 'View all atmtransaction in atmtransaction table: Success (/view/atmtransactions)'});
        }
    })          
    
})

customerRouter.get('/view/atmtransactions/:id',(req, res) =>{
    let atmTransactionId = req.params.id;

    if (!atmTransactionId){
        return res.status(400).send({error: true, message: "Please insert information (/view/atmtransactions/:id)"});
    }else{
        database.query(`SELECT * FROM atmtransaction WHERE atm_transaction_id = ${id};`, (error, results) => {
            if(error){
                return res.send({error: true, data: results, message: 'Mysql statement error (/view/atmtransactions/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found atmtransaction_Id:'+ atmTransactionId + 'in accout table(/view/atmtransactions/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found atmtransaction:'+ atmTransactionId + 'in accout table(/view/atmtransactions/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/atmtransactions',(req, res) =>{
    let fromAccountId = req.body.fromAccountId;
    let atmId = req.body.atmId;
    let atmAmount = req.body.amount

    if (!fromAccountId || !atmId || !atmAmount){
        return res.status(400).send({error: true, message: "Please insert information (/create/atmtransactions)"});
    }else{
        database.query(`INSERT INTO atmtransaction (from_account_id,atm_id,amount,transaction_status_id) VALUES (${fromAccountId},${atmId},${atmAmount},3);`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create atmtransaction: Mysql error statement(/create/atmtransactions)'});
            }else{
                return res.send({error: false, data: results, message: 'Create atmtransaction: Success(/create/atms)'});
            }
        }) 
    }         
})

// ---------------- bank table----------------
customerRouter.get('/view/banks',(req, res) =>{
    database.query(`SELECT * FROM bank`, (error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Mysql statement error (/view/banks)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found banks in bank table(/view/banks)'});
        }else{
            return res.send({error: false, data: results, message: 'View all banks in bank table: Success (/view/banks)'});
        }
    })          
    
})

customerRouter.get('/view/banks/:id',(req, res) =>{
    let bankId = req.params.id;

    if (!bankId){
        return res.status(400).send({error: true, message: "Please insert information (/view/abanks/:id)"});
    }else{
        database.query(`SELECT * FROM bank WHERE bank_id = ${id};`, (error, results) => {
            if(error){
                return res.send({error: true, data: results, message: 'Mysql statement error (/view/banks/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found bank_Id:'+ bankId + 'in bank table(/view/banks/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found banks:'+ bankId + 'in bank table(/view/banks/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/banks',(req, res) =>{
    let managerId = req.body.managerId;
    let bankName = req.body.bankName;

    if (!managerId || !bankName){
        return res.status(400).send({error: true, message: "Please insert information (/create/banks)"});
    }else{
        database.query(`INSERT INTO bank (manager_id,bank_name) VALUES (${managerId},?);`,bankName, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create banks: Mysql error statement(/create/banks)'});
            }else{
                return res.send({error: false, data: results, message: 'Create banks: Success(/create/banks)'});
            }
        }) 
    }         
})

// ---------------- billing transaction table----------------
customerRouter.get('/view/billTransactions',(req, res) =>{
    database.query(`SELECT * FROM billingtransaction;`, (error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Mysql statement error (/view/billTransactions)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found bill transaction in billingtransaction table(/view/billTransactions)'});
        }else{
            return res.send({error: false, data: results, message: 'View all bill in billingtransaction table: Success (/view/billTransactions)'});
        }
    })          
    
})

customerRouter.get('/view/billTransactions/:id',(req, res) =>{
    let billId = req.params.id;

    if (!billId){
        return res.status(400).send({error: true, message: "Please insert information (/view/billTransactions/:id)"});
    }else{
        database.query(`SELECT * FROM billingtransaction WHERE billing_transaction_id = ${billId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/billTransactions/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found billTransactions:'+ billId + 'in billTransactions table(/view/billTransactions/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found billTransactions:'+ billId + 'in billTransactions table(/view/billTransactions/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/billTransactions',(req, res) =>{
    let fromAccountId = req.body.fromAccountId;
    let billAmount = req.body.billAmount;

    if (!fromAccountId || !billAmount){
        return res.status(400).send({error: true, message: "Please insert information (/create/billTransactions)"});
    }else{
        database.query(`INSERT INTO  billingtransaction (from_account_id,amount,transaction_status_id) VALUES (${fromAccountId},${billAmount},2);`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create billTransactions: Mysql error statement(/create/billTransactions)'});
            }else{
                return res.send({error: false, data: results, message: 'Create billTransactions: Success(/create/billTransactions)'});
            }
        }) 
    }         
})

// ---------------- branch table----------------
customerRouter.get('/view/branchs',(req, res) =>{
    database.query(`SELECT * FROM branch;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/branchs)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found branch in branchs table(/view/branchs)'});
        }else{
            return res.send({error: false, data: results, message: 'View all branchs in branchs table: Success (/view/branchs)'});
        }
    })          
    
})

customerRouter.get('/view/branchs/:id',(req, res) =>{
    let branchsId = req.params.id;

    if (!branchsId){
        return res.status(400).send({error: true, message: "Please insert information (/view/branchs/:id)"});
    }else{
        database.query(`SELECT * FROM branch WHERE branch_id = ${branchsId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/branchs/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found branchs:'+ branchsId + 'in branchs table(/view/branchs/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found branchs:'+ branchsId + 'in branchs table(/view/branchs/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/branchs',(req, res) =>{
    let bankId = req.body.bankId;
    let branchName = req.body.branchName;
    let branchAddress = req.body.branchAddress;

    if (!bankId || !branchName || !branchAddress){
        return res.status(400).send({error: true, message: "Please insert information (/create/branchs)"});
    }else{
        database.query(`INSERT INTO branch (bank_id,branch_name,branch_address) VALUES (${bankId},?,?);`,[branchName,branchAddress], (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create branchs: Mysql error statement(/create/branchs)'});
            }else{
                return res.send({error: false, data: results, message: 'Create branchs: Success(/create/branchs)'});
            }
        }) 
    }         
})


// ----------------[customer table]----------------
customerRouter.get('/view/customers',(req, res) =>{
    database.query(`SELECT * FROM customer;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/customers)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [customer] in [customer table](/view/customers'});
        }else{
            return res.send({error: false, data: results, message: 'View all [customer] in [customer table]: Success (/view/customers)'});
        }
    })          
    
})

customerRouter.get('/view/customers/:id',(req, res) =>{
    let customerId = req.params.id;

    if (!customerId){
        return res.status(400).send({error: true, message: "Please insert information (/view/customers/:id)"});
    }else{
        database.query(`SELECT * FROM customer WHERE customer_id = ${customerId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/customers/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [customers]:'+ customerId + 'in [customers] table(/view/customers/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [customers]:'+ customerId + 'in [customers] table(/view/customers/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/customers',(req, res) =>{
    let userId = req.body.userId;
    if (!userId){
        return res.status(400).send({error: true, message: "Please insert information (/create/customers)"});
    }else{  
        database.query(`INSERT INTO customer (user_id) VALUES (${userId});`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create [customers]: Mysql error statement(/create/customers)'});
            }else{
                return res.send({error: false, data: results, message: 'Create [customers]: Success(/create/customers)'});
            }
        }) 
    }         
})

// ----------------[employee table]----------------
customerRouter.get('/view/employees',(req, res) =>{
    database.query(`SELECT * FROM employee;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/employees)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [employees] in [employees] table(/view/employees'});
        }else{
            return res.send({error: false, data: results, message: 'View all [employees] in [employees] table: Success (/view/employees)'});
        }
    })          
    
})

customerRouter.get('/view/employees/:id',(req, res) =>{
    let employeeId = req.params.id;

    if (!employeeId){
        return res.status(400).send({error: true, message: "Please insert information (/view/employees/:id)"});
    }else{
        database.query(`SELECT * FROM employee WHERE employee_id = ${employeeId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/employees/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [employees]:'+ employeeId + 'in [employees] table(/view/employees/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [employees]:'+ employeeId + 'in [employees] table(/view/employees/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/employees',(req, res) =>{
    let branchId = req.body.branchId;
    let userId = req.body.userId;

    if (!branchId || !userId){
        return res.status(400).send({error: true, message: "Please insert information (/create/employees)"});
    }else{
        database.query(`INSERT INTO employee (branch_id,user_id) VALUES (${branchId},${userId});`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create [employees]: Mysql error statement(/create/employees)'});
            }else{
                return res.send({error: false, data: results, message: 'Create [employees]: Success(/create/employees)'});
            }
        }) 
    }         
})

// ----------------[loan table]----------------
customerRouter.get('/view/loans',(req, res) =>{
    database.query(`SELECT * FROM loan ;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/loans)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [loans] in [loans] table(/view/loans'});
        }else{
            return res.send({error: false, data: results, message: 'View all [loans] in [loans] table: Success (/view/loans)'});
        }
    })          
    
})

customerRouter.get('/view/loans/:id',(req, res) =>{
    let loanId = req.params.id;

    if (!loanId){
        return res.status(400).send({error: true, message: "Please insert information (/view/loans/:id)"});
    }else{
        database.query(`SELECT * FROM loan WHERE loan_id = ${loanId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/loans/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [loans]:'+ loanId + 'in [loans] table(/view/loans/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [loans]:'+ loanId + 'in [loans] table(/view/loans/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/loans',(req, res) =>{
    let accountId = req.body.accountId;
    let loanAmount = req.body.loanAmount;
    let accountInterest = req.body.accountInterest;
    let loanAproveBy = req.body.loanAproveBy;

    if (!accountId || !loanAmount || !accountInterest || !loanAproveBy){
        return res.status(400).send({error: true, message: "Please insert information (/create/loans)"});
    }else{
        database.query(`INSERT INTO loan (account_id,initial_amount,left_amount,interest_rate,transaction_status_id,loan_approved_by) 
                        VALUES (${accountId},${loanAmount},${loanAmount},${accountInterest},1,${loanAproveBy});`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create [loans]: Mysql error statement(/create/loans)'});
            }else{
                return res.send({error: false, data: results, message: 'Create [loans]: Success(/create/loans)'});
            }
        }) 
    }         
})

// ----------------[loan paying table]----------------
customerRouter.get('/view/loanPayings',(req, res) =>{
    database.query(`SELECT * FROM loanpaying;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/loanpayings)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [loanpaying] in [loanpaying] table(/view/loanpayings'});
        }else{
            return res.send({error: false, data: results, message: 'View all [loanpaying] in [loanpaying] table: Success (/view/loanpayings)'});
        }
    })          
    
})

customerRouter.get('/view/loanPayings/:id',(req, res) =>{
    let loanPayId = req.params.id;

    if (!loanPayId){
        return res.status(400).send({error: true, message: "Please insert information (/view/loanPayings/:id)"});
    }else{
        database.query(`SELECT * FROM loanpaying WHERE  loan_paying_id = ${loanPayId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/loanPayings/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [loanPayings]:'+ loanPayId + 'in [loanPayings] table(/view/loanPayings/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [loanPayings]:'+ loanPayId + 'in [loanPayings] table(/view/loanPayings/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/loanPayings',(req, res) =>{
    let loanId = req.body.loanId;
    let payAmount = req.body.payAmount;

    if (!loanId || !payAmount ){
        return res.status(400).send({error: true, message: "Please insert information (/create/loanPayings)"});
    }else{
        database.query(`INSERT INTO loanpaying (loan_id,amount,transaction_status_id) VALUES (${loanId},${payAmount},3);`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create [loanPayings]: Mysql error statement(/create/loanPayings)'});
            }else{
                return res.send({error: false, data: results, message: 'Create [loanPayings]: Success(/create/loanPayings)'});
            }
        }) 
    }         
})

// ----------------[manager table]----------------
customerRouter.get('/view/managers',(req, res) =>{
    database.query(`SELECT * FROM manager;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/managers)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [managers] in [managers] table(/view/managers'});
        }else{
            return res.send({error: false, data: results, message: 'View all [managers] in [managers] table: Success (/view/managers)'});
        }
    })          
    
})

customerRouter.get('/view/managers/:id',(req, res) =>{
    let managerId = req.params.id;

    if (!managerId){
        return res.status(400).send({error: true, message: "Please insert information (/view/managers/:id)"});
    }else{
        database.query(`SELECT * FROM manager WHERE manager_id = ${managerId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/managers/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [managers]:'+ managerId + 'in [managers] table(/view/managers/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [managers]:'+ managerId + 'in [managers] table(/view/managers/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/managers',(req, res) =>{
    let userId = req.body.userId 
    if (!userId){
        return res.status(400).send({error: true, message: "Please insert information (/create/managers)"});
    }else{
        database.query(`INSERT INTO manager (user_id) VALUES (${userId});`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create [managers]: Mysql error statement(/create/managers)'});
            }else{
                return res.send({error: false, data: results, message: 'Create [managers]: Success(/create/managers)'});
            }
        }) 
    }         
})

// ----------------[membership table]----------------
customerRouter.get('/view/memberships',(req, res) =>{
    database.query(`SELECT * FROM membership;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/memberships)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [memberships] in [memberships] table(/view/memberships'});
        }else{
            return res.send({error: false, data: results, message: 'View all [memberships] in [memberships] table: Success (/view/memberships)'});
        }
    })          
    
})

customerRouter.get('/view/memberships/:id',(req, res) =>{
    let memberId = req.params.id;

    if (!memberId){
        return res.status(400).send({error: true, message: "Please insert information (/view/memberships/:id)"});
    }else{
        database.query(`SELECT * FROM membership WHERE membership_id = ${memberId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/memberships/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [memberships]:'+ memberId + 'in [memberships] table(/view/memberships/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [memberships]:'+ memberId + 'in [memberships] table(/view/memberships/:id)'});
            }
        })          
    }
})

/*-- no member ship create method
customerRouter.post('/create/',(req, res) =>{

    if (! ){
        return res.status(400).send({error: true, message: "Please insert information (/create/)"});
    }else{
        database.query(`INSERT INTO   VALUES (${},${});`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create []: Mysql error statement(/create/)'});
            }else{
                return res.send({error: false, data: results, message: 'Create []: Success(/create/)'});
            }
        }) 
    }         
})
*/

// ----------------[position table]----------------
customerRouter.get('/view/positions',(req, res) =>{
    database.query(`SELECT * FROM position;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/positions)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [positions] in [positions] table(/view/positions'});
        }else{
            return res.send({error: false, data: results, message: 'View all [positions] in [positions] table: Success (/view/positions)'});
        }
    })          
})

customerRouter.get('/view/positions/:id',(req, res) =>{
    let positionId = req.params.id;

    if (!branchsId){
        return res.status(400).send({error: true, message: "Please insert information (/view/positions/:id)"});
    }else{
        database.query(`SELECT * FROM position WHERE  = ${positionId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/positions/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [positions]:'+ positionId + 'in [positions] table(/view/positions/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [positions]:'+ positionId + 'in [positions] table(/view/positions/:id)'});
            }
        })          
    }
})
/* ----- no create position 
customerRouter.post('/create/',(req, res) =>{

    if (! ){
        return res.status(400).send({error: true, message: "Please insert information (/create/)"});
    }else{
        database.query(`INSERT INTO   VALUES (${},${});`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create []: Mysql error statement(/create/)'});
            }else{
                return res.send({error: false, data: results, message: 'Create []: Success(/create/)'});
            }
        }) 
    }         
})
*/

// ----------------[topup transaction]----------------
customerRouter.get('/view/topupTransactions',(req, res) =>{
    database.query(`SELECT * FROM topuptransaction;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/topupTransactions)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [topuptransaction] in [topuptransaction] table(/view/topupTransactions'});
        }else{
            return res.send({error: false, data: results, message: 'View all [topuptransaction] in [topuptransaction] table: Success (/view/topupTransactions)'});
        }
    })          
    
})

customerRouter.get('/view/topupTransactions/:id',(req, res) =>{
    let topupId = req.params.id;

    if (!branchsId){
        return res.status(400).send({error: true, message: "Please insert information (/view/topupTransactions/:id)"});
    }else{
        database.query(`SELECT * FROM topuptransaction WHERE topup_transaction_id = ${topupId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/topupTransactions/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [topupTransactions]:'+ topupId + 'in [topupTransactions] table(/view/topupTransactions/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [topupTransactions]:'+ topupId + 'in [topupTransactions] table(/view/topupTransactions/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/topupTransactions',(req, res) =>{
    let fromAccountId = req.body.fromAccountId;
    let mobNumber = req.body.mobNumber;
    let topupAmount = req.body.topupAmount;

    if (!fromAccountId || !mobNumber || !topupAmount ){
        return res.status(400).send({error: true, message: "Please insert information (/create/topupTransactions)"});
    }else{
        database.query(`INSERT INTO topuptransaction (from_account_id,mobile_number,amount,transaction_status_id) VALUES (${fromAccountId},${mobNumber},${topupAmount},3)`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create [topupTransactions]: Mysql error statement(/create/topupTransactions)'});
            }else{
                return res.send({error: false, data: results, message: 'Create [topupTransactions]: Success(/create/topupTransactions)'});
            }
        }) 
    }         
})

// ----------------[transfer status]----------------
customerRouter.get('/view/transactionstatus',(req, res) =>{
    database.query(`SELECT * FROM transactionstatus;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/transactionstatus)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [transactionstatus] in [transactionstatus] table(/view/transactionstatus'});
        }else{
            return res.send({error: false, data: results, message: 'View all [transactionstatus] in [transactionstatus] table: Success (/view/transactionstatus)'});
        }
    })          
    
})

customerRouter.get('/view/transactionstatus/:id',(req, res) =>{
    let transStatusId = req.params.id;

    if (!transStatusId){
        return res.status(400).send({error: true, message: "Please insert information (/view/transactionstatus/:id)"});
    }else{
        database.query(`SELECT * FROM transactionstatus WHERE transaction_status_id = ${transStatusId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/transactionstatus/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [transactionstatus]:'+  + 'in [transactionstatus] table(/view/transactionstatus/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [transactionstatus]:'+  + 'in [transactionstatus] table(/view/transactionstatus/:id)'});
            }
        })          
    }
})
/* transaction status
customerRouter.post('/create/',(req, res) =>{

    if (! ){
        return res.status(400).send({error: true, message: "Please insert information (/create/)"});
    }else{
        database.query(`INSERT INTO   VALUES (${},${});`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create []: Mysql error statement(/create/)'});
            }else{
                return res.send({error: false, data: results, message: 'Create []: Success(/create/)'});
            }
        }) 
    }         
})
*/

// ----------------[transfer transaction table]----------------
customerRouter.get('/view/transfertransactions',(req, res) =>{
    database.query(`SELECT * FROM transfertransaction;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/transfertransactions)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [transfertransactions] in [transfertransactions] table(/view/transfertransactions'});
        }else{
            return res.send({error: false, data: results, message: 'View all [transfertransactions] in [transfertransactions] table: Success (/view/transfertransactions)'});
        }
    })          
    
})

customerRouter.get('/view/transfertransactions/:id',(req, res) =>{
    let transferId = req.params.id;

    if (!branchsId){
        return res.status(400).send({error: true, message: "Please insert information (/view/transfertransactions/:id)"});
    }else{
        database.query(`SELECT * FROM transfertransaction WHERE transfer_transaction_id = ${transferId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/transfertransactions/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [transfertransaction]:'+ transferId + 'in [transfertransaction] table(/view/transfertransactions/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [transfertransaction]:'+  + 'in [transfertransaction] table(/view/transfertransactions/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/transfertransactions',(req, res) =>{
    let fromAccountId = req.body.fromAccountId;
    let toAccountId = req.body.fromAccountId;
    let amount = req.body.amount;
    if (!fromAccountId || !toAccountId || !amount ){
        return res.status(400).send({error: true, message: "Please insert information (/create/transfertransaction)"});
    }else{
        database.query(`INSERT INTO transfertransaction (from_account_id,to_account_id,amount,transaction_status_id) VALUES (${fromAccountId},${toAccountId},${amount},3);`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create [transfertransaction]: Mysql error statement(/create/transfertransaction)'});
            }else{
                return res.send({error: false, data: results, message: 'Create [transfertransaction]: Success(/create/transfertransaction)'});
            }
        }) 
    }         
})

// ----------------[user table]----------------
customerRouter.get('/view/users',(req, res) =>{
    database.query(`SELECT * FROM user;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/users)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [users] in [users] table(/view/users'});
        }else{
            return res.send({error: false, data: results, message: 'View all [users] in [users] table: Success (/view/users)'});
        }
    })          
    
})

customerRouter.get('/view/users/:id',(req, res) =>{
    let userId = req.params.id;

    if (!branchsId){
        return res.status(400).send({error: true, message: "Please insert information (/view/users/:id)"});
    }else{
        database.query(`SELECT * FROM  user WHERE user_id = ${userId};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view/users/:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found [users]:'+ userId + 'in [] table(/view/users/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found [users]:'+ userId + 'in [] table(/view/users/:id)'});
            }
        })          
    }
})

customerRouter.post('/create/users',(req, res) =>{
    let positionID = req.body.positionID;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let dateOfB = req.body.dateOfB;
    let email = req.body.email;
    let mobNumber = req.body.mobNumber;
    let address = req.body.address;
    let sex = req.body.sex;
    let userName = req.body.userName;
    let userPass = req.body.userPass;

    if(!positionID || !firstName || !lastName || !dateOfB || !email || !mobNumber || !address || !sex || !userName || !userPass){
        return res.status(400).send({error: true, message: "please insert all user information before register(userAPi.js)"});
    }else{
        database.query(`INSERT INTO user (position_id,first_name,last_name,date_of_birth,email,mobile_number,address,sex,username,password) 
                    VALUES (?,?,?,?,?,?,?,?,?,?);`,[positionID,firstName,lastName,dateOfB,email,mobNumber,address,sex,userName,userPass]
                    , (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Can not create [users]: Mysql error statement(/create/users)'});
            }else{
                return res.send({error: false, data: results, message: 'Create [users]: Success(/create/users)'});
            }
        }) 
    }         
})

// ---------------- billing transaction table----------------
/*
let diction = {
    bank:{
        valueA: true,
        valueB: true
    },
    bbank:{
        valueA: true,
        valueB: true
    },
    user:{
        valueA: true,
        valueB: true
    } 
};
customerRouter.get('/view/:id',(req, res) =>{
    let accountId = req.params.id;

    if (!accountId){
        return res.status(400).send({error: true, message: "Please insert information (/view/atm/:id)"});
    }else{
        console.log('pass1');
        console.log('dictionary:'+diction[accountId].length);

        database.query(`SELECT * FROM ${accountId};`, (error, results) => {
            if(error){
                throw error;
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found atm:'+ accountId + 'in accout table(/view/atm/:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found atm:'+ accountId + 'in accout table(/view/atm/:id)'});
            }
        })          
    }
})
*/

module.exports = customerRouter;
