const express = require('express');
const app = express();
const {logger} = require('./middleware/logEvents')
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

app.use( logger);

const whitelist = ['https://www.google.com', 'https://www.youtube.com', 'https://expressjs.com','http://127.0.0.1:5500', 'http://localhost:3500']

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error("Not Allowed By CORS"));
        }
    },
    optionsSuccessStatus: 200
}
// cross origin resource shearing 
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(express.static(path.join(__dirname, "/public",)))



app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
})
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, "new-page.html")
})

app.get('/hello(.html)?', (req, res, next) => {
    console.log("Attempten to load hello.html");
    next();
}, (req, res) => {
    res.send('Hello World!!');
});


const one = (req, res, next) => {
    console.log("one");
    next();
}
const two = (req, res, next) => {
    console.log("two");
    next();
}

const three = (req, res) => {
    console.log("three"); b
    res.send('Finished');
};

app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`server runing on port ${PORT}`));