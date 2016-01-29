var express = require('express');
var passport = require('passport');
var Orders = require('../models/orders');
var router = express.Router();
var multiparty = require('multiparty');
var async = require('async');

router.get('/getOrders', function(req, res) {
    Categories.find({}, function(err, orders) {
        if (err) throw err;
        res.send(orders);
    });
});

module.exports = router;