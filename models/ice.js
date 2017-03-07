
// models/ice.js

var Ice 	= require('../schema/ice.js');

var request = require('request');
var cheerio = require('cheerio');
var cron 	= require('node-cron');

//
//

module.exports = function(site, user, pass) {

	var mySite = site;
	var myUser = user;
	var myPass = pass;

	// Run every hour at :00
	cron.schedule('0 0,6,12,18 * * *', function() {

		// Set jar to true, so cookies are stored
		var myRequest = request.defaults({jar: true});

		myRequest({
			url: mySite + '/Default.aspx',
		}, function(error, response, body) {

			// Grab needed variables for POST-request
			var $ = cheerio.load(body)
			var x = $('#__EVENTVALIDATION').attr('value');
			var y = $('#__VIEWSTATE').attr('value');

			myRequest({
				url: mySite + '/Default.aspx',
				method: 'POST',
				form: {
		            __EVENTVALIDATION: x,
		            __VIEWSTATE: y,
		            ctl00$ContentPlaceHolder1$tbUserID: myUser,
		            ctl00$ContentPlaceHolder1$tbPIN: myPass,
					ctl00$ContentPlaceHolder1$btnHiddenSubmit: "",	
				},
			}, function(error, response, body) {

				myRequest({
					url: mySite + '/MyPage.aspx',
				}, function(error, response, body) {

					// Grab wanted data from GET-request
					var $ = cheerio.load(body)
					var a = $('.usage-progress-used').attr('value');
					var b = $('.usage-progress-limit').attr('value');
					var c = [];
					var e = $('.usage-progress-limit-extra').attr('value');
		            $('td', '#tblAbonnement').each(function(i, elem) {
						c[i] = $(this).text().trim();
					});

					console.log('Usage: ' + a);
					console.log('Limit: ' + b);
					console.log('Extra: ' + e);
					console.log('Table: ' + c);

					// Dump data to mongo using our ice schema
					var myIce = new Ice();
					myIce.usage = a;
					myIce.limit = b;
					myIce.extra = e;
					myIce.ip 	= c[4];

					myIce.save(function(err) {
						if(err) {
							throw err;
						};
					});

		            // c[3] - SIM
					// c[4] - IP
				});
			});
		});
	});
};