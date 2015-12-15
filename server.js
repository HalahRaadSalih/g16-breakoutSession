var express = require('express');
var app = express();
var router = require('./PixelArt/controllers/router');

// Set the view engine && public folder
app.set('view engine', 'ejs');
app.set('views',[__dirname + '/PixelArt/views',
	__dirname + '/Mole/views']);

app.use(express.static('Assets'));

// Register root route
app.use('/', router);

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server up and listening on', port);
});