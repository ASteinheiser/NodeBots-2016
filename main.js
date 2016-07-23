var five = require('johnny-five')
var keypress = require('keypress')
var net = require('net')

var socket = net.connect({host: 'ESPD45C6B.local', port: 3030})
socket.on('connect', function(){
  socket.emit('open', null)
})

var feather = new five.Board({port: socket})

feather.on('ready', function() {
  var left = new five.Servo.Continuous(14)
  var right = new five.Servo.Continuous(13)

  keypress(process.stdin)

  process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
      process.exit()
    }
    if (key && key.name == 'up') {
      left.cw(1)
      right.ccw(1)
    }
    if (key && key.name == 'down') {
      left.ccw(1)
      right.cw(1)
    }
    if (key && key.name == 'left') {
      left.ccw(1)
      right.ccw(1)
    }
    if (key && key.name == 'right') {
      left.cw(1)
      right.cw(1)
    }
  })
})
