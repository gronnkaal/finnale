
// models/ice.js

var Ice 	= require('../schema/ice.js');

var request = require('request');
var cheerio = require('cheerio');

//
//

module.exports = function(site, user, pass) {

	var mySite = site;
	var myUser = user;
	var myPass = pass;

	Ice.findOne().sort({ created_at: 'desc', _id: -1 }).limit(1).exec(function(err, doc){

		console.log(doc);

		var tsN = new Date().getTime();
		var tsD = new Date(doc.created_at).getTime();
		var ts3 = (new Date().getTime() - (3 * 60 * 60 * 1000));

		if (tsD < ts3) {
			console.log("Updating..");
			doRequest(mySite,myUser,myPass);
		} else {
			console.log("Up-to-date");
		}
	});

}

function doRequest(site, user, pass) {

	// Set jar to true, so cookies are stored
	var myRequest = request.defaults({jar: true});

	myRequest({
		url: site + '/Default.aspx',
	}, function(error, response, body) {

		// Grab needed variables for POST-request
		var $ = cheerio.load(body)
		var x = $('#__EVENTVALIDATION').attr('value');
		var y = $('#__VIEWSTATE').attr('value');

		myRequest({
			url: site + '/Default.aspx',
			method: 'POST',
			form: {
	            __EVENTVALIDATION: x,
	            __VIEWSTATE: y,
	            ctl00$ContentPlaceHolder1$tbUserID: user,
	            ctl00$ContentPlaceHolder1$tbPIN: pass,
				ctl00$ContentPlaceHolder1$btnHiddenSubmit: "",	
			},
		}, function(error, response, body) {

			myRequest({
				url: site + '/MyPage.aspx',
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
};