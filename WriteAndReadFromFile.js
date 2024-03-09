const http = require('http');

const routs = require('./route');

const server = http.createServer(routs);

server.listen(3000);