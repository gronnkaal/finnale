
// routes/ice.js

var express = require('express');
var router 	= express.Router();

//

var Ice 	= require('../schema/ice.js');

module.exports = function () {

  router.get('/', isAuthenticated, function(req, res, next) {
    Ice.find().sort({_id:-1}).limit(1).lean().exec(function(err,obj) {
      if (err) {
        console.log('Error: No data found..');
        res.json({
          ip: 'xx.xx.xx.xx',
          usage: 'xxxx',
          limit: 'yyyy',
          created: 'xx-xx-xx xx:xx',
        });
      } else {
        res.json({
          ip: obj[0].ip,
          usage: obj[0].usage,
          limit: obj[0].limit,
          created: obj[0].created_at,
        });
      }
    });
  });

  return router;

};

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
};
