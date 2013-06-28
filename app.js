
/**
 * Module dependencies.
 */

var express = require('express')
  , cons = require('consolidate')
  , swig = require('swig')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);

// Make Swig the default templating engine
app.engine('.html', cons.swig);
app.set('view engine', 'html');
swig.init({
    root: __dirname + "/views",
    allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
});
app.set('views', __dirname + '/views');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.render('index.html', { foo: 'bar' });
});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
