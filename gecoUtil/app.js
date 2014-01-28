
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var GeCoModel = require('gecoUtil').GeCoModel;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// commento le routes di default
//app.get('/', routes.index);
//app.get('/users', user.list);

//Istanza DB
var gecoModel = new GeCoModel("miak3d19.sistemi.sole24.net","DbGeco2007","dbgeco00","dbgeco00");

//Routes
app.get('/', function(req, res){
	res.render('index', {
            title: 'Ricerca Utenti GeCo'
        });
});


app.get('/result/:qUserID', function(req, res){
  gecoModel.getUserById(function(error, record){
      res.render('result', {
            title: 'Result',
            Record: record
        });
  },req.params.qUserID);
});

app.get('/resultJSON/:qUserID', function(req, res){
  gecoModel.getUserById(function(error, record){
      res.json(record);
  },req.params.qUserID);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
