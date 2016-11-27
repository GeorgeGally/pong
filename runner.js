
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});

var io = require('socket.io').listen(8000)

var SerialPort = require('serialport');
///dev/cu.usbmodem1411
// var port = new SerialPort('COM3', {
var port = new SerialPort('/dev/cu.usbmodem1411', {
  // autoOpen: false
});


port.on('open', function(){
  // Now server is connected to Arduino
  console.log('Serial Port Opend');

  var lastValue;
  io.sockets.on('connection', function (socket) {
      //Connecting to client
      console.log('Socket connected');
      socket.emit('connected');
      var lastValue;

      port.on('data', function(data){
          var angle = data[0];
          if(lastValue !== angle){
              socket.emit('data', angle);
          }
          lastValue = angle;
      });
  });
});


// //var io = require('socket.io')(8080);
// var io = require('socket.io');
//var io = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
//     // If socket.io receives message from the client browser then
//     // this call back will be executed.
//     socket.on('message', function (msg) {
//         console.log(msg);
//     });
//     // If a web browser disconnects from Socket.IO then this callback is called.
//     socket.on('disconnect', function () {
//         console.log('disconnected');
//     });
// });

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });


/////////////////
//
//
// var app = require('http').createServer(handler)
// var io = require('socket.io')(app);
// var fs = require('fs');
//
// app.listen(80);
//
// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//
//     res.writeHead(200);
//     res.end(data);
//   });
// }
//
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });


//////////////////////////






port.on('open', function() {
  // port.write('main screen turn on', function(err) {
  //   if (err) {
  //     return console.log('Error on write: ', err.message);
  //   }
  //   console.log('message written');
  // });
  console.log('port open');
});

//open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  console.log(data);
  //var array = data.split(',');
  io.sockets.emit('message', data);

});



SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});
