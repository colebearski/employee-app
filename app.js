var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cons = require("consolidate");
var dust = require("dustjs-helpers");
var pg = require("pg");
app = express();

// DB Connect
var connect = "postgres://admin:ktmHurricane90@localhost/employeeDB";

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

// Route
app.get("/", function(req, res) {
  res.render("index");
});

// Server
app.listen(3000, function() {
  console.log("Server Listening on Port 3000");
});
