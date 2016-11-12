//
// routes/ice.js

var express = require('express');
var router = express.Router();


module.exports = function (myCherrio, myRequest) {

  router.get('/', function(req, res, next) {

    var myUrl = req.app.get('remoteUrl') + "/Default.aspx"; 

    myRequest({
      url: myUrl,
      jar: true,
    }, function(error, response, body) {

      if (!error) {

        var $ = myCherrio.load(body);
        var eventValidation = $('#__EVENTVALIDATION').attr('value');
        var viewState = $('#__VIEWSTATE').attr('value');

        var myUrl = req.app.get('remoteUrl') + "/Default.aspx"; 
        var myUser = req.app.get('remoteUser');
        var myPass = req.app.get('remotePass');

        myRequest({
          url: myUrl,
          method: 'POST',
          jar: true,
          form: {
            __EVENTVALIDATION: eventValidation,
            __VIEWSTATE: viewState,
            ctl00$ContentPlaceHolder1$tbUserID: myUser,
            ctl00$ContentPlaceHolder1$tbPIN: myPass,
            ctl00$ContentPlaceHolder1$btnHiddenSubmit: "",
          },
        }, function(error, response, body) {
         
          if (!error) {

            var myUrl = req.app.get('remoteUrl') + "/MyPage.aspx";

            myRequest({
              url: myUrl,
              jar: true,
            }, function(error, response, body) {

              if(!error) {

                var $ = myCherrio.load(body);

                var tableData = [];

                var bandwidthUsage = $('.usage-progress-used').attr('value');
                var bandwidthLimit = $('.usage-progress-limit').attr('value');

                $('td', '#tblAbonnement').each(function(i, elem) {
                  tableData[i] = $(this).text().trim();
                });

            //    var bandwidthSim = tableData[3];
                var bandwidthSim = "XXXXXXXXXX";
                var bandwidthIp = tableData[4];

                res.json({
                  limit: bandwidthLimit,
                  usage: bandwidthUsage,
                  sim: bandwidthSim,
                  ip: bandwidthIp,
                });                

              } else {

                res.json({
                  success: "tr: no",
                });

              };

            });

          } else {

            res.json({
              success: 'sr: no',
            });

          };

        });

      } else {

        res.json({
          success: 'fr: no',
        });

      };

    });

  });

  return router;

};

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
};
