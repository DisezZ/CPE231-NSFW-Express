const express = require('express');
const userRouter = express.Router();
const database = require('../databaseConfig');

//------[get all user information] 
userRouter.get('/',(req, res) =>{
    /*
    let userSearch = req.body.userName
    if(!userSearch)
    {
        return res.status(400).send({error: true, message: "please insert information (problem occur on userApi.js)"});
    }*/
    database.query('SELECT * FROM user', (error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Error occur SELECT * FROM user: mysql statemet (userApi/)'});
        }else{
            console.log(results.length)
            return res.send({error: false, data: results, message: "View all user: success"});
        }
    })
})
/*
//-------[get specific user]
userRouter.get('/:attribute/:condition',(req, res) =>{
    let attributeSearch = req.params.attribute;
    let userSearch = req.params.condition;
    const rawAtribute = attributeSearch;
    const userid = parseInt(userSearch);
    if(!userSearch)
    {
        return res.status(400).send({error: true, message: "please insert information (problem occur on userApi.js)"});
    }
    database.query(`SELECT * FROM user WHERE ${attributeSearch} = ?;`,[userid], (error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Error occur SELECT * FROM user: mysql statemet (/users)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: `No ${userid} in column ${attributeSearch}`});
        }else{
            return res.send({error: false, data: results, message: "View specific user: success"});
        }
    })
})
*/
//##########################[User register]##############################
userRouter.post('/users/register',(req, res) =>{
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
    }
    database.query(`INSERT INTO user (position_id,first_name,last_name,date_of_birth,email,mobile_number,address,sex,username,password) 
                    VALUES (?,?,?,?,?,?,?,?,?,?);`,[positionID,firstName,lastName,dateOfB,email,mobNumber,address,sex,userName,userPass]
                    ,(error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Error occur in insert data mysql statemet (/users)'});
        }else{
            return res.send({error: false, data: results, message: "View specific user: success"});
        }
    })
})

//###################################################################

//#######################[customer part]##############################
// -- get all customer
userRouter.get('/customers',(req, res) =>{
    const customer = 'customer';
    database.query(`SELECT * FROM ${customer};`, (error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Error occur SELECT * FROM (/user/customers)'});
        }else{
            return res.send({error: false, data: results, message: "View specific user: success"});
        }
    })
})
// -- add custome
userRouter.post('/customer/register',(req, res) =>{
    let customerId = req.body.customerId;
    const customer = 'customer';
    database.query(`INSERT INTO customer (customer_id,user_id) VALUES (DEFAULT,?);`,[customerId],(error, results) => {
        if(error){
            return res.send({error: true, data: results, message: 'Error occur INSERT INTO customer (/user/register)'});
        }else{
            return res.send({error: false, data: results, message: "View specific user: success"});
        }
    })
})
module.exports = userRouter;
//######################################################################