console.log("starting test 1");

var socket = io.connect();

socket.on('message', function(data){
    console.log(data.message);
});
