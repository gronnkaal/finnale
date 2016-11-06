var express = require('express');
var router = express.Router();

/* GET / */
router.get('/', function(req, res, next) {
  res.render('ice', { title: 'ICE'})
});

/* GET /bandwidth */
router.get('/bandwidth', function(req, res, next) {

  var fs = require('fs'), obj;

  fs.readFile('./private/ice.json', handleFile)

  function handleFile(err, data) {
      if (err) throw err
      obj = JSON.parse(data)
      res.json(obj.bandwidth)
  }

});

/* GET /info */
router.get('/info', function(req, res, next) {

  var fs = require('fs'), obj;

  fs.readFile('./private/ice.json', handleFile)

  function handleFile(err, data) {
      if (err) throw err
      obj = JSON.parse(data)
      res.json(obj.info)
  }

});

module.exports = router;
