//---Aca se crea la aplicacion---
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan'); //middlewer
const routes = require('./routes/index.js'); // mi carpeta routes requiere mi carpeta index

require('./db.js');

const server = express(); // server es mi servidor, mi aplicacion 
1
server.name = 'API';

//server.use significa decile a la req quen entre a ()
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev')); // la req entra en morgan continua su camino
// console.log("probando el camino")

// server.use(express.json());//* lo escribo para que el body que estaba en json, se transforme en js, en este archivo ya realiza estop el bodyparser 

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); // en mi index tengo que poner todas las rutas, que se continue en camino hacia el enrutador

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server; // voy a exportar mi servidor para usarlo en index
