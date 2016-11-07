var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var test = require('./routes/test');

var port = 3000;

var app = express();

// Setup view engine
// - Let the app knows where are views that will be used
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set routes
app.use('/', index);
app.use('/api', tasks);
app.use('/test', test);

// Listen to port
app.listen(port, function(){
	console.log('Server started on port' + port);
});
