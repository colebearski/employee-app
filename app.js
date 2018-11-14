var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cons = require("consolidate");
var dust = require("dustjs-helpers");

const { Pool, Client } = require("pg");
app = express();

// Assign Dust Engine to .dust files
app.engine("dust", cons.dust);

// Set Default Ext .dust
app.set("view engine", "dust");
app.set("views", __dirname + "/views");

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
// GET
app.get("/", function(req, res) {
  // Connection to DB Info
  const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "employeeDB",
    password: 12345,
    port: 5433
  });

  // Connection using created pool
  pool.connect(function(err, client, done) {
    pool.query("SELECT * FROM employees", function(err, result) {
      if (err) {
        return console.error("error running query", err);
      }
      res.render("index", { employees: result.rows });
      done();
    });
  });
});

// Route
// POST
app.post("/add", function(req, res) {
  // Connection to DB Info
  const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "employeeDB",
    password: 12345,
    port: 5433
  });

  // Connection using created pool
  pool.connect(function(err, client, done) {
    pool.query(
      "INSERT INTO employees(name, position, salary) VALUES($1, $2, $3) ",
      [req.body.name, req.body.position, req.body.salary]
    );

    done();
    res.redirect("/");
  });
});

// Server
app.listen(3000, function() {
  console.log("Server Listening on Port 3000");
});
