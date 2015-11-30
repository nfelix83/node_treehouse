var http = require('http'),
	router = require('./router.js'),
	port = 1337,
	ip = '127.0.0.1';

http.createServer(function(req, res){
	router.home(req, res);
	router.user(req, res);
}).listen(port, ip);
console.log('The server is listening at ' + ip + " on port: " + port);