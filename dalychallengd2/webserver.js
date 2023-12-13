const http = require('http')

const server = http.createServer(function(request,response){
    console.log('request received on ' + request.url)
    // response.end('Hello Sir')
    if(request.url == '/') {
        response.end('Welcome to home')
    }
    else if(request.url == '/lol') {
        response.writeHead(200,{'Content-type': 'application/json'})
        response.end('{"message": "hello sir"}')
    }
    else if(request.url == '/rofl') {
        response.writeHead(200,{'Content-type': 'text/html'})
        response.end('<h1>Hello Madame</h1>')
    }
    else {
        response.writeHead(404)
        response.end("Page not found")
    }
});

server.listen(5001,'localhost', function(){
    console.log('running')
})
