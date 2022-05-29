const express = require('express');
const app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const port = 8000;
const cors = require('cors');

//Create Database Connection
var pgp = require('pg-promise')();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

app.use(cors());
app.use(express.static(`build`))
require("dotenv").config();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		
**********************/
const PORT = process.env.PORT || 8000;
const initializePassport = require("./passportConfig");

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'users',
	user: 'postgres',
	password: 'password'
};

app.use(express.urlencoded({ extended: false }));
// adding express as our view engine
app.set("view engine", "ejs");

// adding passport session in our middle ware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// initializing passport sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.get('/api/test', (req, res) => {
    exec('./server/resources/test', (error, stdout, stderr) => {
        if (error) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(500);
            res.json({ message: stderr });
        }
        else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200);
            res.json({ message: stdout });
        }
        
    });
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.json({ message: "Hello World!" });
});

// Search Post request
app.post('/src/search', (req, res) => {
    // retreives the data from the frontend
    var input = req.body.sequence;
    
    // creates a file with the data that can be used to query the database and writes to the file
    fs.writeFile("/blast/queries/in.fasta", input, (err) => {
        if (err) {
            console.log('WriteFile Error', err);
        }
    });

    // Queries the database
    exec(`blastn -query /blast/queries/in.fasta -db 16S_ribosomal_RNA -out /blast/results/results.json -dust no -outfmt "13"`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        //returns the results of the query
        fs.readFile("/blast/results/results_1.json", "utf8", (err, jsonString) => {
            if (err) {
              console.log("Error reading:", err);
              res.json({message: 'No hits found'});
            }
            try {
              var result_blast = JSON.parse(jsonString);
              //console.log("result_blast:", result_blast.BlastOutput2.report.results.search); 
              //the results should be in json format
              res.json(result_blast.BlastOutput2.report.results.search);
            } catch (err) {
              console.log("Error parsing JSON string:", err);
              res.json({message: 'No hits found'});              
            }
          });
    });
});

// checking if user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("http://localhost:3000");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
