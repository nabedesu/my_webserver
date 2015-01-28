
// 必要パッケージをロード
var http      = require('http');
var mongoose  = require('mongoose');
var express   = require('express');

// We need to define variables to represent our express application and our database.
var app    = express();
var db;

// Next we need to define the configuration of the other server instance hosting our database. replace the HOST in the following variable definition with your database instance’s public DNS.
var config = {
  "USER"    : "ec2-user",
  "PASS"    : "",
  "HOST"    : "ec2-54-64-183-23.ap-northeast-1.compute.amazonaws.com",
  "PORT"    : "27017", 
  "DATABASE" : "my_example"
};

// Then define the details for the database we will be connecting to on that instance.
var dbPath  = "mongodb://"+config.USER + ":"+
    config.PASS + "@"+
    config.HOST + ":"+
    config.PORT + "/"+
    config.DATABASE;
var standardGreeting = 'Hello World!';

// Now lets create something to store in our Db, and that is going to simply be Dennis Ritchie’s old faithful “Hello World!” greeting. Using mongoose we need to create a schema and a model using that schema.
var greetingSchema = mongoose.Schema({
  sentence: String
}); 
var Greeting= mongoose.model('GreetingreetingSchema);

// Our first action on startup is to connect to our Mongo database hosted on the other server
db = mongoose.connect(dbPath);

//In the connection successful event handler, check if the database already contains a greeting. if not, create one and save it to the database.

mongoose.connection.once('openunction() {
  var greeting;
  Greeting.find( function(err, greetings){
   if( !greetings ){     
      greeting = new Greeting({ sentence: standardGreeting }); 
      greeting.save();
    } 
  }); 
});

//Now set up the Express routes to handle incoming requests. First, respond to requests to our domain by extracting or greeting from the Db and sending it as the response

app.get('/', function(req, res){
  Greeting.findOne(function (err, greeting) {
    res.send(greeting.sentence);
  });
});

//Set up an Express route to handle any errors
app.use(function(err, req, res, next){
  if (req.xhr) {
    res.send(500, 'Something went wrong!');
  }
  else {
    next(err);
  }
});

// Finally, you need to start the Express Webserver:
console.log('starting Express (NodeJS) Web server');
app.listen(8080);
console.log('Webserverlistening on port 8080');
