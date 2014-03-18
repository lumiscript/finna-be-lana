var request = require('request');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });

  request('http://gplayer.herokuapp.com/api/playlist/cloudafrica', function(error, response, body) {

  	//console.log(body);

  });

};