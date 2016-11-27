var http = require("http");
    var url = require('url');
    var fs = require('fs');

    var server = http.createServer(function(request, response){
        var path = url.parse(request.url).pathname;
        console.log(path);
        switch(path){
            case '/':
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write('hello world');
                response.end();
                break;
            case '../index.html':
                fs.readFile(__dirname + path, function(error, data){
                    if (error){
                      console.log(error);
                        response.writeHead(404);
                        response.write("xxopps this doesn't exist - 404");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(data, "utf8");
                        response.end();
                    }
                });
                break;
            default:
                response.writeHead(404);
                response.write("opps this doesn't exist - 404");
                response.end();
                break;
        }
    });

    server.listen(8001);
