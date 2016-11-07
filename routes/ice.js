var express = require('express');
var router = express.Router();

/*
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('ice', { title: 'ICE'})
});


router.get('/bandwidth', function(req, res, next) {

  var fs = require('fs'), obj;

  fs.readFile('./private/ice.json', handleFile)

  function handleFile(err, data) {
      if (err) throw err
      obj = JSON.parse(data)
      res.json(obj.bandwidth)
  }

});


router.get('/info', function(req, res, next) {

  var fs = require('fs'), obj;

  fs.readFile('./private/ice.json', handleFile)

  function handleFile(err, data) {
      if (err) throw err
      obj = JSON.parse(data)
      res.json(obj.info)
  }

});

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
};

*/

module.exports = router;
