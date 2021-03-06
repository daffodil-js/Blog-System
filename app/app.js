var express = require('express');
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes/default'),
    adminRoutes = require('./routes/admin'),
    app = express();

GLOBAL.Parse = require('parse').Parse;
Parse.initialize('TgePKQZ0V5ILd4oSi6iXce2x5e2hYnJdpb26am3a', 'mrbVNvY516kDmzg6CscXMeyiHZpWTpkfqwR92Zrs', 'yfYW2nP3QPIAGEdvSOCcaG5rljfOJUybHMGq0Opt');

// The Blob settings
app.set('title', 'The Blob');
app.set('email', 't@theblob.com');

// view engine setup
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        //res.render('error', {
        //    message: err.message,
        //    error: err
        //});

        res.redirect('/');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});

    res.redirect('/');
});

module.exports = app;