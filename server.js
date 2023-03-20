require('dotenv').config();
const app = require('./app');
const http = require('http');

const normalizePort = (val) => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
         throw new Error(`Invalid port number: ${val}`);
        }    
    if (port >= 0) {
      return port;
    }
};
const port = normalizePort(process.env.PORT || '3030');
app.set('port', port);

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("listening to the port",port);
})