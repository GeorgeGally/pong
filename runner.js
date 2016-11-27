
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});

var player_1 = 100;
var player_2 = 100;

//var io = require('socket.io')(8080);
var io = require('socket.io').listen(8000);
//var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    // If socket.io receives message from the client browser then
    // this call back will be executed.
    socket.on('message', function (msg) {
        console.log(msg);
    });
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on('disconnect', function () {
        console.log('disconnected');
    });
});


var SerialPort = require('serialport');

var port = new SerialPort('COM3', {
  // autoOpen: false
});


port.on('open', function() {
  // port.write('main screen turn on', function(err) {
  //   if (err) {
  //     return console.log('Error on write: ', err.message);
  //   }
  //   console.log('message written');
  // });
});

//open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  console.log('Data: ' + data);
  var array = data.split(',');
  io.sockets.emit('message', array);
});



SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});
