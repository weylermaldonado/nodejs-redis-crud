
/**
 * Module dependencies.
 */

const express = require('express'),
    routes = require('./routes/routes');

const app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.todo);
app.get('/about', routes.todo);
app.get('/todo', routes.todo);
app.post('/save', routes.saveTodo);
app.get('/remove', routes.removeTodo);
app.listen(3000, function(){
  console.log("Servidor express escuchando en ", app.address().port, app.settings.env);
});
