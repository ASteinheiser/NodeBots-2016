var five = require('johnny-five')
var net = require('net');

var socket = net.connect({host: 'ESPD45C6B.local', port: 3030});
socket.on('connect', function(){
  socket.emit('open', null);
});

var feather = new five.Board({port: socket});

feather.on('ready', function() {
  console.log('hello')
});
