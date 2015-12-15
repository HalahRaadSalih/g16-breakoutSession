var express = require("express");
var router = express.Router();


router.get('/', function(req, res) {
	console.log(__dirname);
  res.render('PixelArt');
});

module.exports = router;