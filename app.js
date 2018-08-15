import studentsRouter from './app/routes/students'
import careersRouter from './app/routes/careers';
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';

var app = express();

//
// View engine setup
//
app.set('views', path.join(__dirname, 'app/views'));
// app.set('view engine', '');

app.use(express.static(path.join(__dirname, 'public')));

//
// Middleware
//
app.use(logger('tiny'));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//
// Routes
//
app.use('/api/students/', studentsRouter);
app.use('/api/careers', careersRouter);

//
// Root path
//
app.get('/', (req, res) => res.send('Hola mundo desde Express'));

// Catch 404 error
app.use((req, res, next) => {
    return res.send('404 page not found');
});


module.exports = app;