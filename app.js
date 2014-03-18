
/**
 * Module dependencies.
 */

var express = require('express');
var request = require('request');
var routes = require('./routes');
var app = express();
var user = require('./routes/user');
var path = require('path'),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);


//MongoDB hookup
var monk = require('monk');
var db = function() {
    return monk('mongodb://lumi:Fibonacci1234@dharma.mongohq.com:10073/gidimongo');
} 

 var mongoInsertTodo = function(mongoObject) {


       var collection = db().get('Todo');

        // Submit to the DB
        collection.insert(mongoObject, function(err, doc) {
            if (err) {
                // If it failed, return error
                console.log("There was a problem adding the information to the database.");
            } else {
                // If it worked, log this
                console.log("Saved to MongoDB");


            }
        });
    }







server.listen(3000);


io.sockets.on('connection', function(socket) {

    setInterval(function () {
    socket.emit('onNewDate', {'times': (new Date()).toString(), age: 30});
  }, 1000);



});






// all environments
app.set('port', process.env.PORT || 8080);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//socket



app.get('/', routes.index);
app.get('/users', user.list);

app.get('/addbounty', function(req, res) {
  res.render('addbounty');
});

app.post('/addbounty', function(req, res) {
  bounties.push(req.body);
  res.redirect('/');
});

app.get('/bounties', function(req, res) {
  res.json(bounties);
});

app.get('/cloudafrica', function(req, res) {
  request('http://gplayer.herokuapp.com/api/playlist/cloudafrica', function(error, response, body) {
        
        res.json(body);
  });
});

app.get('/todo/all', function(req, res){
  
  var collection = db().get('Todo');
   collection.find({}, function (err, docs){
    
    if (err) { 
      console.log(err);
    } else {

    //console.log(docs);
      res.json(docs);
  
  
    }
    
   });


})


app.post('/todo', function(req, res) {

  //post to DB
  mongoInsertTodo(req.body);
 
    var postdetails = req.body;
    console.log(req.body);
    
    res.json(postdetails);

      
  
 
  });
