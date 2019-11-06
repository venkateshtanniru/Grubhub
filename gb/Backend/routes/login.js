const express = require('express');
const pool = require('../configFiles/connectionPooling');
var mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


const app = express.Router();

//login
app.post('/login', (req, res) => {
    console.log("In login post");
    console.log(req.body);

    //connection
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("Error while connecting to database");
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error while connecting to database");
        } else {

            //query
            const sql = `SELECT * from users where userEmail= ${mysql.escape(req.body.userEmail)} `;// AND userPassword = ${mysql.escape(req.body.userPassword)}
            console.log(sql);


            conn.query(sql, (err, result) => {
                if (err) {
                    res.writeHead(400, {
                        'Contnet-type': 'text/plain'
                    });
                    res.end("Invalid credentials");
                } else {
                    if (result.length == 0 || !bcrypt.compareSync(req.body.userPassword, result[0].userPassword)) {//|| !bcrypt.compareSync(req.body.userPassword, result[0].userPassword))
                        res.writeHead(402, {
                            'Content-type': 'text/plain'
                        });
                        console.log("Invalid credentials db");
                        res.end("Invalid credentials");
                    } else {
                        console.log(result);
                        console.log("local Storage: ", req.session.userEmail);
                        var temp = {
                            userName : result[0].UserName,
                            accountType : result[0].accountType,
                            userEmail: result[0].userEmail,
                        }
                        const token=jwt.sign(temp,'secretkey')


                        req.session.userEmail = result[0].userEmail;
                        console.log("req.session.userEmail" + req.session.userEmail);
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        });
                        var Result = {
                            userName : result[0].userName,
                            accountType : result[0].accountType,
                            userEmail: result[0].userEmail,
                            jwt : token
                        }
                        // res.send(result[0].accountType)
                        res.end(JSON.stringify(Result));
                        console.log("Login successful");
                    }
                }
            });
        }
    });
});

module.exports = app;