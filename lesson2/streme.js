const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt', ), 'utf8' );

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newlorem.txt'))


// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })

rs.pipe(ws)

process.on('uncaughtException', error => {
    console.error(`There was in uncaught error: ${error}`)
    process.exit(1)
})

