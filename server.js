// Express, Body Parser and Mongoose.
var express = require('express'), bodyParser = require('body-parser'), mongoose = require('mongoose');

// We require the form model from an external file, to save both code and space.
var Form = require('./web-form-model.js');
var User = require('./web-form-model.js');
var loggedin = false;
var user= " ";
var app = new express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connection.on("error", function(err) {
	if (err) {
		console.error(err);
		mongoose.disconnect();
	}
});

// If we have a connection to the database, do the following...
mongoose.connection.once("open", function() {

	console.log("Database connected...");

	// POST request, gets data from the front-end and inserts it in the database.
	app.post('/signup',function(req,res) {			
		var username=req.body.username;
		var email=req.body.email;
		var password=req.body.password;
		User.findOne({
			
			username:username,
			email:email
			
			
	},function(err,item){
		if(err)console.log(err);
		else if(item!= null)res.json( { message: "you are registered"});
		else {
			User.create({
			username:username,
			email:email,
			password:password
		},function(err,item){
			if(err){console.log(err);
			}else {console.log(item);
			}
		});
		}
	})
	});
	
	
	app.get('/profile',function(req,res){
		if(loggedin==true) res.sendFile(__dirname +"/public/home.html");
		else res.send("ju nuk jeni i loguar");

		
	});


//kerkojme ne database per userin qe rregjistruam 
	app.post('/login',function(req,res){
		var username=req.body.username;	
		var password=req.body.password;
		
		console.log(username);
		console.log(password);
		
		User.findOne({
			username:username,
			password: password
		},function(err,item){
			if(err){
				console.log(err);
				res.json({message:err});
			}else if(item==null){
				res.json({message :"nuk u gjet useri"});
			}else {loggedin=true; user=username;
			res.json({message:"u gjet"});
			
			}
		});
	
		
		
	});
});


	app.post("/", function(req, res) {
		var form = {
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			mungesat: req.body.mungesat,
			programimIorientuar: req.body.programimIorientuar,
			java: req.body.java,
			arkitekture: req.body.arkitekture		
		};
		

		
		Form.create(form, function(err, result) {
			
			if (err) console.error(err);
			else {
				console.log(result);
				res.status(201).json({message: "Web form submitted successfully."});
			}
		});
	});


	app.post("/find", function(req, res) {
			Form.findOne({name: req.body.name}, function(err, result) {
				if (err) console.error(err);
				else res.status(200).json(result);
			});
	});

app.get('/logout',function(req,res){
	loggedin=false;
	res.json({message:"you are now logged out"});

});


mongoose.connect("mongodb://jori:jori@ds147799.mlab.com:47799/bookstore").then(function() {
	app.listen(process.env.PORT || 7000);
});
