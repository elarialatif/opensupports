var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var frontHomeRouter = require('./routes/front/home');
var adminRouter = require('./routes/back/admin/index');
var stuffRouter = require('./routes/back/staff/index');
var exphbs = require('express-handlebars');
var connectTodataBase = require('./config/database');
var helpers = require('./helper/handlebars');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var fileUpload = require('express-fileupload');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'layouts/frontUsers/app',
    layoutsDir: __dirname + '/views/',
    helpers: {time: helpers.time, ifEquals: helpers.ifEquals,division:helpers.division}
}));
app.set('view engine', 'hbs');
app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,
    //   cookie: {secure: true}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload({limits: {fileSize: 50 * 1024 * 1024}}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productSupport', frontHomeRouter);
app.use('/admin', adminRouter);
app.use('/stuff', stuffRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// // parse various different custom JSON types as JSON
// app.use(bodyParser.json({type: 'application/*+json'}))
//
// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({type: 'application/vnd.custom-type'}))
//
// // parse an HTML body into a string
// app.use(bodyParser.text({type: 'text/html'}))
module.exports = app;
