var http = require("http");
var sio  = require("socket.io");

// create http server
var server = http.createServer().listen(process.env.PORT, process.env.IP);

// create socket server
var io = sio.listen(server);

io.sockets.on('connection', function(socket) {
    console.log('user connected with IP', socket.handshake.address);
    
    socket.on('requestReset', function() {
        console.log(socket.handshake.address,'requested reset');
        socket.broadcast.emit('reset');
    });
    
    socket.on('requestAutoFill', function() {
        console.log(socket.handshake.address,'requested auto-fill');
        socket.broadcast.emit('autoFill');
    });
    
    socket.on('requestNextColor', function($index) {
        socket.broadcast.emit('nextColor', $index);
    });
});
