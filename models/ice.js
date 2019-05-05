
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
		var ts0 = (new Date().getTime() - (10 * 1000));

		if (tsD < ts0) {
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
		url: site + '/User/Login',
	}, function(error, response, body) {

		myRequest({
			url: site + '/User/Login',
			method: 'POST',
			form: {
				Username: user,
				Password: pass,
				Submit: "",
			},
		}, function(error, response, body) {

			myRequest({
				url: site + '/Subscription',
			}, function(error, response, body) {

				// Grab wanted data from GET-request
				var $ = cheerio.load(body)

				$('div[class=val]').each(function(i, elm) {
					console.log($(this).tex
				$('div[class=content]').et().trim());
				});ach(function(i, elm) {
					console.log($(this).text().trim());
				});

				/*
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
				*/
	            // c[3] - SIM
				// c[4] - IP
			});
		});
	});
};