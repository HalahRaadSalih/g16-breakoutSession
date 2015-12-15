var express = require("express");
var router = express.Router();


router.get('/', function(req, res) {
  	res.render('PixelArt');
});

router.get('/Mole', function(req, res) {
  	res.render('index');
});

router.get('/Mole/whack-a-mole', function(req, res) {
  	res.render('whack-a-mole');
});

module.exports = router;