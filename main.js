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

  var turnLeft = function() {
    left.cw(1)
    right.cw(1)
  }
  var turnRight = function() {
    left.ccw(1)
    right.ccw(1)
  }
  var forward = function() {
    left.cw(1)
    right.ccw(1)
  }
  var reverse = function() {
    left.ccw(1)
    right.cw(1)
  }
  var stop = function() {
    left.cw(0)
    right.cw(0)
  }

  keypress(process.stdin)

  process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
      process.exit()
    }
    if (key && key.name == 'up') {
      forward()
    }
    if (key && key.name == 'down') {
      reverse()
    }
    if (key && key.name == 'left') {
      turnLeft()
    }
    if (key && key.name == 'right') {
      turnRight()
    }
    if (key && key.name == 'space') {
      stop()
    }
  })
})
