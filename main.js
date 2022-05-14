let express = require('express');
let app = express();
let bodyParser = require('body-parser');
/*
let mysql = require('mysql');
let fs = require('fs');
const database = require('./databaseConfig');
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000;
/*
let dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cpe231Proj_local',
    multipleStatements: true
})
dbCon.connect();
*/
/*--------------[To do list]-------------------
- user: view[] 
- trasnferMoney: transfer[/]             
- topup: topupTransaction[/]
- loan: createLoanContract[/],loanpaying
- bill: paybill[-], createbil[/], checkbill[/]
- atm: withdraw[/], deposit[/]
- account:
-
-
-
------------------------------------------------
*/

//----------------real main--------------------//
//--main page api

//app.use('/api',require('./routes/mainPage')); 

//--Account api
app.use('/api/Login',require('./routes/loginApi'));

//--Account api
app.use('/api/Accounts',require('./routes/accountApi'));
//--Transfer api
app.use('/api/Transfermoney', require('./routes/transfermoneyApi'));

// -- Billing transaction api
app.use('/api/BillingTransaction',require('./routes/billTransApi'));

// --Topup service api
app.use('/api/Topup',require('./routes/topupTransApi'));

// -- ATM withdraw & Deposit
app.use('/api/ATM',require('./routes/atmApi'));

// -- Loan
app.use('/api/Loan',require('./routes/loanApi'));
// -- user
app.use('/user',require('./routes/userApi')); 
// -- customer
app.use('/customer',require('./routes/customerApi')); 



//--------------------------------------//
/*
app.get('/users',(req, res) => {
    database.query('SELECT * FROM user', (error, results, fields) => {
        if (error) throw error;
        
        let message = ""
        if(results === undefined || results.length == 0)
        {
            message = "User not found";
        }
        else
        {
            message = "User found"
        }
        return res.send({error: false, data: results, message: message});
    })
})


app.get('/string',(req, res) => {
    let string = 'SELECT * FROM user';
    database.query(string, (error, results, fields) => {
        if (error) throw error;
        
        let message = ""
        if(results === undefined || results.length == 0)
        {
            message = "User not found";
        }
        else
        {
            message = "User found"
        }
        return res.send({error: false, data: results, message: message});
    })
})

app.get('/membership',(req, res) => {
    let membershipName = req.body.membership_name;
    let sqlCommand = 'SELECT * FROM membership WHERE membership_name = ?';
    
    if (!membershipName)
    {
        return res.status(400).send({error: true, message: "please insert table"});
    }
    else
    {
        database.query(sqlCommand,membershipName,(error, results, fields) => {
        if (error) {
            throw error;
            return res.send({error: true, data: null});
        }else{
            return res.send({error: false, data: results, message: "querry member ship successful."});
        }    
        })
    }
})

app.post('/positionC',(req, res) => {
    let positionName = req.body.positionName;
    //let temp = req.body.temp;

    if (!positionName)
    {
        return res.status(400).send({error: true, message: "please insert position"});
    }
    else
    {
        database.query('INSERT INTO position VALUES (DEFAULT,?);',[positionName],(error, results, fields) => {
        if (error) throw error;      
        return res.send({error: false, data: results, message: "Add postion: " + positionName + "success"});
        })
    }
})


app.post('/post', (req, res) =>{
    console.log(req.body)
    return res.send("hello post");
})

app.put('/position',(req, res) => {
    let posId = req.body.posId;  
    let posName = req.body.posName;

    if(!posId || !posName)
    {
        return res.status(400).send({error: true, message: "please insert information"});
    }
    else
    {
        database.query('UPDATE position SET position_name = ? WHERE position_id = ?',[posName,posId],(error, results, fields) => {
        if (error) throw error;      
        return res.send({error: false, data: results, message: "SET postion: success"});
        })
    }
})
*/

app.use('/',(req, res) =>{
    return res.send({
        error: false, 
        message: 'welcome to my page nsfw API'
    })
})

app.listen(port, (req, res) =>{
    console.log(`Running on port: ${port}`);
})

module.exports = app;