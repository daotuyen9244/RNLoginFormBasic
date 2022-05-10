var express = require("express");
var router = express.Router();
var fs = require("fs");
/* ADD DB PROCESS */
const sql = require("mssql");
const config = {
  user: "tuyendt",
  password: "12345",
  server: "DESKTOP-SFDGTK8",
  database: "Demo",
  options: {
    trustServerCertificate: true
  }
};

/* List of API */
router.get("/", function (req, res, next) {
  res.render("list", {
    title: "ABOUTREACT",
    apilist: [
      {
        name: `${req.headers.host}/api/user`,
        description: "All User Listing",
        method: "get",
      },
      {
        name: `${req.headers.host}/api/user/register`,
        description: "New User Register",
        method: "post",
      },
      {
        name: `${req.headers.host}/api/user/login`,
        description: "User Authentication",
        method: "post",
      },
      {
        name: `${req.headers.host}/api/user/search`,
        description: "User Search",
        method: "get",
      },
    ],
  });
});

/* All User Listing */
router.get("/user", function (req, res, next) {
  const users = require("../users");
  res.send({ status: "success", data: users, msg: "" });
});

/* New User Register */
router.post("/user/register", function (req, res, next) {
  console.log("req.body -> ", req.body);
  const users = require("../users");
  let newUsers = users.filter(function (e) {
    return e.email == req.body.email;
  });
  if (newUsers.length > 0) {
    res.send({ status: "failed", data: {}, msg: "User Already Exists" });
  } else {
    users.push(req.body);
    fs.writeFile("./users.json", JSON.stringify(users), (err) => {
      // Checking for errors
      if (err)
        res.send({
          status: "failed",
          data: {},
          msg: `Something went wrong ${err}`,
        });
      res.send({ status: "success", data: req.body, msg: "" });
    });
  }
});

async function asyncCall(req, res) {
  //console.log('calling');
  //const result = await  sql.connect(config);
  //console.log(result);
  try {
    //await sql.connect(config);
    // res.send("DB Connected");
    await sql.connect(config, function (err) {
      if (err) {
        console.log("ERROR");
      }
      else {
        console.log("DB Connected");
      }
      // create Request object
      var request = new sql.Request();
      // query to the database and get the records
      request.query('select * from product', function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        console.log(recordset);
      });
    });
  } catch (err) {
    console.log(err);
  }
}
/* User Authentication */
router.post("/user/login", function (req, res, next) {
  console.log("req.body -> ", req.body);
  const users = require("../users");
  let newUsers = users.filter(function (e) {
    return e.email == req.body.email && e.password == req.body.password;
  });
  if (newUsers.length > 0) {
    res.send({ status: "success", data: newUsers[0], msg: "" });
  } else {
    res.send({ status: "failed", data: {}, msg: "No UserId / Password Found" });
  }
  asyncCall();
});

/* User Search */
router.get("/user/search", function (req, res, next) {
  console.log("req.body -> ", req.query);
  const users = require("../users");
  console.log(users);
  let newUsers = users.filter(function (e) {
    return e.name && e.name.toLowerCase().includes(req.query.q.toLowerCase());
  });
  res.send({ status: "success", data: newUsers, msg: "" });
});

module.exports = router;
