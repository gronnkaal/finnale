var express = require('express');
var router = express.Router();

/* GET / */
router.get('/', function(req, res, next) {
  res.send('You have reached /ice');
});

/* GET /json */
router.get('/json', function(req, res, next) {

  var fs = require('fs'), obj;
  
  fs.readFile('./private/ice.json', handleFile)
 
  function handleFile(err, data) {
      if (err) throw err
      obj = JSON.parse(data)
      res.json(obj)
  }
  
});

module.exports = router;
