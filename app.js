var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var ObjectId = require('mongodb').ObjectId;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.get('/', (req, res) => res.send('HELLO...Wlecome to My Project!'));

//INSERTING PHASE
app.post('/registration', (req, res) => {
    console.log(req.body);
   if(req.body.empUsername){
    var emp = {
        "empUsername": req.body.empUsername,
        "empPassword": req.body.empPassword,
        "empPassword1": req.body.empPassword1,
        "empEmail": req.body.empEmail

    };

  

    MongoClient.connect('mongodb://localhost:27017/emp', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            let custRes = {}
            db.collection("employee").insertOne(emp, function (err, result) {
                if (err) {
                    custRes = {
                        "status": 400,
                        "error": err
                    }
                }
                else {
                    custRes = {
                        "status": 200,
                        "result": result
                    }

                }

                res.json(custRes);
            });

            //res.send("Database Connected ...!");
        }
    });
    }
    else{
     custRes = {
         "status": 400,
         "error": "Please enter Username"
     }
     res.json(custRes);
    }

   

});



app.listen(3001, () =>
    console.log('Example app listening on port 3001!'))










    