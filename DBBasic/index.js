/*const express = require('express');
const sql = require("mssql");
const app = express();
*/
/*-------------------add details of sqlConfig-----------------*/
/*
const config = {
    user: "tuyendt",
    password: "12345",
    server: "DESKTOP-SFDGTK8",
    database: "Demo",
    options: {
        trustServerCertificate: true
    }
};
*/
/******************************************************************/
/*
app.get("/", async (req, res) => {
    try {
        //await sql.connect(config);
        // res.send("DB Connected");
        await sql.connect(config, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send("DB Connected");
            }
            // create Request object
            //var request = new sql.Request();
            // query to the database and get the records
            //request.query('select * from product', function (err, recordset) {
            //   if (err) console.log(err)
            // send records as a response
            //    res.send(recordset);
            //});
            
        });
    } catch (err) {
        res.send(err);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`service is running on:: [${port}]`);
});
*/
const app = require('./app');
const server = require('http').Server(app);
server.listen(4001,'localhost', ()=> {
    console.log('Server Started');
});