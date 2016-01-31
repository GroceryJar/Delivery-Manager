var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./configuration/config'),
    //session = require('express-session'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    port = process.env.port || 8080,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    connect = require('connect');

var server = require('http').createServer(app);
var io = require('socket.io')({
    "transports": ["xhr-polling"],
    "polling duration": 10,
    'log level': 1
});

//this line is for openshift deployment
var server_port = process.env.PORT || 8080;
var routes = require('./routes/index');

//Connect to Database only if Config.js parameter is set.
if (config.use_database === 'true') {
    mongoose.connect(config.database);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("mongoDB connected!");
    });

}
app.use(cookieParser());
app.set('view engine', 'ejs');  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//parse application/x-www-form-urlencoded
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/shop/public'));
app.use('/', routes);


//On refresh of /home like page it should point to index.html
app.use(function(req, res) {
    res.sendfile(__dirname + '/shop/public/index.html');
});

io.listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('location', function (data) {
        io.sockets.emit('location', data);
    });
});

server.listen(server_port, function() {
    console.log('Magic happens on port ' + server_port);
});


