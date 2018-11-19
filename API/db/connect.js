const mongoose = require('mongoose');

(async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/cinderApp', { useNewUrlParser: true });
        console.log("DB Connection successful.");
    } catch (err) {
        console.log('Connection Error: ', err);
    }
})();

module.exports = {
    mongoose
}