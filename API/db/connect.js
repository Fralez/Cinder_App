const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cinderApp', { useNewUrlParser: true })
	.then((result) => {
		console.log("DB Connection successful.");
	}).catch((err) => {
		console.log('Connection Error: ', err);
	});

module.exports = {
	mongoose
}