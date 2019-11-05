const http = require('http');   //default package that doesn't have to be added to package.json
const app = require('./app');

const normalizePort = val => {
    const port = parseInt(val,10);

    if(isNaN(port)) {
        return val;
    }
    if(port >= 0) {
        return port
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if(error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address: 'port' + port;
    switch(error.code) {
        case 'EACCESS':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//Sends back response object to whoevers making the http call : (req,res) => {}
const server = http.createServer(app);
//install nodemon to enable a form of live reload to serve nodemon server

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    console.log('Listening on ' + port);
});

server.listen(port);
