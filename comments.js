// Create web server application
var express = require('express');
// Create web server
var app = express();
// Create web server
var server = require('http').createServer(app);
// Create socket.io application
var io = require('socket.io')(server);
// Create file system
var fs = require('fs');

// Create port
var port = process.env.PORT || 3000;
// Listen port
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Create path
app.use(express.static(__dirname + '/public'));

// Create socket.io application
io.on('connection', function (socket) {
    // Create event
    socket.on('load', function () {
        fs.readFile('data.json', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                socket.emit('load', JSON.parse(data));
            }
        });
    });
    socket.on('save', function (data) {
        fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Data saved to file');
            }
        });
    });
});