var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Order = new Schema({
    //username: String,
});

Order.plugin(passportLocalMongoose);

module.exports = mongoose.model('Order', Order);