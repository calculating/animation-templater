const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');

// Grab certificate
const server = https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/gfx.place/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/gfx.place/privkey.pem')
});

// Specify the server to websocket
const wss = new WebSocket.Server({
    server: server
});

// Specify port to listen to
server.listen(8080)

console.log("WebSocket online")
// waits for connection to be established from the client
// the callback argument ws is a unique for each client

var connections = 0;

wss.on('connection', (ws) => {
    console.log('attempted connect.');
    connections++;
    console.log(connections + ' clients connected');
    ws.send('pl' + connections)
    var aliveCheck = setInterval(check, 1000);
    function check() {
        if (ws.readyState !== 1) {
            connections--;
            reset();
            ws.close();
            console.log(connections + ' clients connected');
            clearInterval(aliveCheck);
        }
    };

    // runs a callback on message event
    ws.on('message', (data) => {
        console.log('recieved websocket message: ' + data)
        message = '';
        if (data[0] == 'c' && connections == 2) {
            console.log('got a message')
            // sends the data to all connected clients
            if (message !== '') {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        console.log('sent message to a client: ' + message);
                        client.send(message);
                    }
                });
            }
        }
    });
});


function reset() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            console.log('reseting game for each client');
            client.send('rr');
        }
    });
}