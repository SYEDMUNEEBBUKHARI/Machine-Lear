// let socket = require('socket.io-client')('http://127.0.0.1:4001');

//starting speed at 0
let speed = 0;

//Simulating reading data every 100 milliseconds
setInterval(function () {


    //we emit the data. No need to JSON serialization!
    socket.emit('incoming data', speed);
}, 100);