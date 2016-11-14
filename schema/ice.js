
// schema/ice.js

var mongoose = require('mongoose');

var iceSchema = mongoose.Schema({
	usage: String,
	limit: String,
	ip: String,
	created_at: Date,
	updated_at: Date
});

iceSchema.pre('save', function(next) {
	var currentDate = new Date();

	this.updated_at = currentDate;
	
	if (!this.created_at) {
		this.created_at = currentDate;
	};
	
	next();
});

module.exports = mongoose.model('Ice', iceSchema)