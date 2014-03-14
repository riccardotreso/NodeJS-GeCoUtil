
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
var gecoModel = new GeCoModel("miak3d19.sistemi.sole24.net",null,null,"DbGeco2007","dbgeco00","dbgeco00");

//Routes
app.get('/', function(req, res){
	res.render('index', {
            title: 'Supporto GeCo'
        });
});

app.get('/Utenti', function(req, res){
	res.render('Utenti', {
            title: 'Ricerca Utenti GeCo'
        });
});

app.get('/Methode', function(req, res){
	res.render('Methode', {
            title: 'Ricerca Collaborazioni Methode'
        });
});

app.post('/methode/result', function(req, res){

	gecoModel.getCollaborazioniMethode(function(error, record){
		if(error)
		{
			console.log("error");
			console.log(error);
			res.json({error: error});
		}
		else
		{
			res.json(record);
		}
			
	},req.body);

});


app.get('/result/:type/:filter', function(req, res){

	var type = req.params.type;
	var jsonResponse = req.query.json === 'true';
	var filter = req.params.filter;
	if(type === "utente")
	{
		gecoModel.getUserById(function(error, record){
			if(error)
				res.render('error', {error: error});
			else
			{
				if(!jsonResponse)
				{
					
						
					res.render('result', {
						title: 'Ricerca per utente ' + filter,
						Record: record
					});
				}
				else
					res.json(record);
			}
				
		},filter);
	}
	if(type === "testata")
	{
		gecoModel.getUserByTestata(function(error, record){
			if(error)
				res.render('error', {error: error});
			else
			{
				if(!jsonResponse)
				{
				  res.render('result', {
						title: 'Ricerca per testata ' + filter,
						Record: record
					});
				}
				else
					res.json(record);
			}
		},filter);
	}
	if(type === "gruppo")
	{
		gecoModel.getUserByGruppo(function(error, record){
			if(error)
				res.render('error', {error: error});
			else
			{
				if(!jsonResponse)
				{
				  res.render('result', {
						title: 'Ricerca per gruppo ' + filter,
						Record: record
					});
				}
				else
					res.json(record);
			}
				
		},filter);
	}
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
