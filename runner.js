
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});


// var SerialPort = require('lib/serialport.js');
var SerialPort = require('serialport');
// var port = new SerialPort('/dev/tty-usbserial1', { autoOpen: false });
//var port = new SerialPort('/dev/cu.Bluetooth-Modem', { autoOpen: false });
var port = new SerialPort('COM3', { autoOpen: false });


port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  }
});

port.on('data', function (data) {
  console.log('Data: ' + data);
}
