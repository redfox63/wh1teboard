// Including libraries

var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static'); // for serving files

// This will make all the files in the current folder
// accessible from the web
var fileServer = new static.Server('./');
	
// This is the port for our web server.
// you will need to go to http://localhost:8080 to see it
app.listen(8080);

// If the URL of the socket server is opened in a browser
function handler (request, response) {

	request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {

	socket.on('clear', function(){
        socket.broadcast.emit('clearRect');
    });
    
	// Start listening for mouse move events
	socket.on('mousemove', function (data) {

		
		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('moving', data);
	});
});