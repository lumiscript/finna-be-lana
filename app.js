
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


server.listen(3000);
io.set('log level', 1);

io.sockets.on('connection', function(socket){

   //send data to client
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 5000);

     //recieve client data
	  socket.on('client_data', function(data){
	    process.stdout.write(data.letter);
	  });


});





var bounties = [];

// all environments
app.set('port', process.env.PORT || 8080);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
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



