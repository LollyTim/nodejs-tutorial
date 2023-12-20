const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmiters extends EventEmitter {

};

const myEmitter = new MyEmiters();

myEmitter.on('log', (msg) => logEvents(msg));
setTimeout(() => {
    myEmitter.emit('log', "log Event Emoitted")
}, 2000)