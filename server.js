var io = require('socket.io').listen(8100);

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
