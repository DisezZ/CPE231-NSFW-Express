// ----------------[]----------------
customerRouter.get('/view/',(req, res) =>{
    database.query(`SELECT * FROM ;`, (error, results) => {
        if(error){
            return res.send({error: error, data: results, message: 'Mysql statement error (/view/)'});
        }
        if (results === undefined || results.length == 0){
            return res.send({error: false, data: results, message: 'Not found [] in [] table(/view/'});
        }else{
            return res.send({error: false, data: results, message: 'View all [] in [] table: Success (/view/)'});
        }
    })          
    
})

customerRouter.get('/view//:id',(req, res) =>{
    let branchsId = req.params.id;

    if (!branchsId){
        return res.status(400).send({error: true, message: "Please insert information (/view//:id)"});
    }else{
        database.query(`SELECT * FROM  WHERE  = ${};`, (error, results) => {
            if(error){
                return res.send({error: error, data: results, message: 'Mysql statement error (/view//:id)'});
            }
            if (results === undefined || results.length == 0){
                return res.send({error: false, data: results, message: 'Not found []:'+  + 'in [] table(/view//:id)'});
            }else{
                return res.send({error: false, data: results, message: 'Found []:'+  + 'in [] table(/view//:id)'});
            }
        })          
    }
})

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