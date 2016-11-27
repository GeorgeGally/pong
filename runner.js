
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});


// var SerialPort = require('lib/serialport.js');
var SerialPort = require('serialport');

SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});


// var port = new SerialPort('/dev/tty-usbserial1', { autoOpen: false });
//var port = new SerialPort('/dev/cu.Bluetooth-Modem', { autoOpen: false });
var port = new SerialPort('COM3', { autoOpen: false });


port.on('open', function() {
  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  console.log('Data: ' + data);
});
