var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var proxyRouter = require('./routes/proxy');

// 跨域插件
var cors = require('cors');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(cors());
app.options("/*", function(req, res, next) {
    // Access-Control-Allow-Credentials: true
    // Access-Control-Allow-Origin: http://localhost:8080
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// app.use('/', indexRouter);
app.use('/proxy', proxyRouter);

module.exports = app;
