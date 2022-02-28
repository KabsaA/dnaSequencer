const express = require('express');
const app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const port = 8000;
const cors = require('cors');
app.use(cors());
app.use(express.static(`build`))
//Create Database Connection
var pgp = require('pg-promise')();

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
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'user_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// Creating filesystem variable
var fs = require("fs");

const { exec } = require('child_process');

//-----------------------------------------------------------------------------------------------//
// for example from lab7
//-----------------------------------------------------------------------------------------------//
// example get request
//-----------------------------------------------------------------------------------------------//
// managing the buttons
// app.get('/home/pick_color', function(req, res) {
// 	var color_choice = req.query.color_selection; // Investigate why the parameter is named "color_selection"
// 	var color_options =  'SELECT * FROM favorite_colors;';// Write a SQL query to retrieve the colors from the database
// 	var color_message = `SELECT color_msg FROM favorite_colors WHERE hex_value = '${color_choice}';`;// Write a SQL query to retrieve the color message for the selected color
// 	db.task('get-everything', task => {
//         return task.batch([
//             task.any(color_options),
//             task.any(color_message)
//         ]);
//     })
//     .then(info => {
//     	res.render('pages/home',{
// 				my_title: "Home Page",
// 				data: info[0],// Return the color options
// 				color: color_choice,// Return the color choice
// 				color_msg: info[1][0].color_msg// Return the color message
// 			})
//     })
//     .catch(err => {
//             console.log('error', err);
//             res.render('pages/home', {
//                 my_title: 'Home Page',
//                 data: '',
//                 color: '',
//                 color_msg: ''
//             })
//     });

// });
//-----------------------------------------------------------------------------------------------//
// example post request
//-----------------------------------------------------------------------------------------------//
// // adding color to table with post request
// app.post('/home/pick_color', function(req, res) {
// 	var color_hex = req.body.color_hex;
// 	var color_name = req.body.color_name;
// 	var color_message = req.body.color_message;
// 	var insert_statement = `INSERT INTO favorite_colors(hex_value, name, color_msg) VALUES('${color_hex}', '${color_name}', '${color_message}');`;// Write a SQL statement to insert a color into the favorite_colors table
// 	var color_select = 'SELECT * FROM favorite_colors;';// Write a SQL statement to retrieve all of the colors in the favorite_colors table
// 	db.task('get-everything', task => {
//         return task.batch([
//             task.any(insert_statement),
//             task.any(color_select)
//         ]);
//     })
//     .then(info => {
//     	res.render('pages/home',{
// 				my_title: "Home Page",
// 				data: info[1],// Return the color choices
// 				color: color_hex,// Return the hex value of the color added to the table
// 				color_msg: color_message// Return the color message of the color added to the table
// 			})
//     })
//     .catch(err => {
//             console.log('error', err);
//             res.render('pages/home', {
//                 my_title: 'Home Page',
//                 data: '',
//                 color: '',
//                 color_msg: ''
//             })
//     });
// });
//-----------------------------------------------------------------------------------------------//

// app.post('/src/signup', async (req,res) => {
//     let {firstName,lastName,email,password,password2} = req.body;
//     console.log({firstName,lastName,email,password,password2 });
// });

// db.query(
//     `INSERT INTO users (firstName,lastName,email,password)
//     VALUES ($1,$2,$3)
//     RETURNING id,password`,  [firstName,lastName,email,password]

// )
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

//Database signup
app.post('/signupData', (req,res) => {
    db.any(`INSERT INTO user_database(username, pword, firstname, lastname)
            VALUES('${req.body.email}', '${req.body.password}', '${req.body.firstName}', '${req.body.lastName}');`)
    .then(console.log)
    .then(() => {
        res.json({message: "it worked"})
    })
    .catch(err => {
        console.log('error', err)
        res.json({message: "error"})
    });
    
});

//login 
/*
app.get('/loginData', (req,res) => {
    db.any(`INSERT INTO user_database (username, pword, firstname, lastname)
            VALUES (${req.body.email}, ${req.body.password}, ${req.body.firstName}, ${req.body.lastName})`).then(console.log);
    
});
*/

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});