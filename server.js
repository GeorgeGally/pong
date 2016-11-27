var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
// var global_path = require('path');
// global.appRoot = global_path.resolve(__dirname);
//console.log(path);

var SerialPort = require('serialport');
///dev/cu.usbmodem1411
// var port = new SerialPort('COM3', {
var port = new SerialPort('/dev/cu.usbmodem1411', {
  // autoOpen: false
});



    var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);

      console.log(path);
      //path = path.slice(1,path.length);
        //console.log(path.slice(1,path.length));
        //switch(path){
        // case '/':
        //         response.writeHead(200, {'Content-Type': 'text/html'});
        //         response.write('hello world');
        //         response.end();
        //         break;

          // case '/css/pong.css':
          //       console.log("css");
          //           fs.readFile(__dirname + path, function(error, data){
          //               if (error){
          //                 console.log(error);
          //                   response.writeHead(404);
          //                   response.write("xxoops this doesn't exist - 404");
          //                   response.end();
          //               }
          //               else{
          //                   response.writeHead(200, {"Content-Type": "text/html"});
          //                   response.write(data, "utf8");
          //                   response.end();
          //               }
          //           });
          //           break;
          //
          //   case '/index.html':
            //console.log(__dirname);
                fs.readFile(__dirname + path, function(error, data){
                    if (error){
                      console.log(error);
                        response.writeHead(404);
                        response.write("xxoops this doesn't exist - 404");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(data, "utf8");
                        response.end();
                    }
                });
              //  break;
            // default:
            //     response.writeHead(404);
            //     response.write("opps this doesn't exist - 404");
            //     response.end();
            //     break;
      //  }
    });

server.listen(8001);

io.listen(server);

var listener = io.listen(server);

listener.sockets.on('connection', function(socket){
    //send data to client
    port.on('data', function (data) {
      data = data.toString();
      // hacks to check the data coming in is ok
      // might just be arduino shit
      data = data.replace(/(\r\n|\n|\r)/gm,"");
      console.log(data);
      var array = data.split(',');
      if (array.length == 2 && array[1] != ""){
        socket.emit('message', {'message': array});
      }
      //socket.emit('message', data);


});
    //
    // setInterval(function(){
    //     socket.emit('date', {'date': new Date()});
    // }, 1000);
});


SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});
