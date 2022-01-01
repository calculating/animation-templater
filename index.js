// WebSocket connection
console.log('Javascript running.');
const connection = new WebSocket('wss://gfx.place:8080');

const commands = {
    ac: function (crd) {
        console.log('setting active position at ' + crd);
    }
};


// Getting messages back from vps
connection.onmessage = (event) => {
    // log info
    console.log("WebSocket recieved message: " + event.data);
    commands[event.data.substring(0, 2)](event.data.substring(2, 4));
};

function start() {
    var tmplt = {
        template = 'audioVisual_retro'
        musicLink = 'https://preview.filmmusic.io/5c2422dd149f21545872093.mp3'

    }
    connection.send()
}


//Console log
connection.onopen = (event) => {
    console.log('WebSocket is sucessfully connected.');
};

connection.onclose = (event) => {
    console.log('WebSocket has closed.');
};

connection.onerror = (event) => {
    console.error('WebSocket error:', event);
};
