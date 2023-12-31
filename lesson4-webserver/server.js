const express = require('express');
const app = express();
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

app.use( logger);

const whitelist = ['https://www.google.com', 'https://www.youtube.com', 'https://expressjs.com','http://127.0.0.1:5500', 'http://localhost:3500']

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else {
            callback(new Error("Not Allowed By CORS"));
        }
    },
    optionsSuccessStatus: 200
}
// cross origin resource shearing 
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/',express.static(path.join(__dirname, "/public",)));
app.use('/subdir', express.static(path.join(__dirname, "/public",)));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));







app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts('json')) {
        res.json({error: "404 Not Found"})
    } else {
       res.type('txt').send('404 not found')
    }
});


app.use(errorHandler);

app.listen(PORT, () => console.log(`server runing on port ${PORT}`));