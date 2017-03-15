var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require ('socket.io')(server);
var port = 3000;

//Socket
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('User connected with ID: ' + socket.id);
	socket.on('mouse',mouseData);

	function mouseData(data){
		socket.broadcast.emit('mouse',data);
		console.log(data);
	}
}

function terminatedConnection(socket){
	console.log('User disconnected with ID: ' + socket.id);
}


server.listen(port, function(){
  console.log('Listening on port: ' + port);
});
//Use the public folder for displaying the sketch
app.use(express.static('public'));