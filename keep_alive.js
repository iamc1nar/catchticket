var http = require("http");
http.createServer(function(req, res){
res.write("Hazır"); 
res.end();
}).listen(8080);