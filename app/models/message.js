var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    title: String,
    message: String,
    sender: String,
    receiver: String
});