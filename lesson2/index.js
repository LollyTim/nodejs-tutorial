const { error } = require('console')
const fsPromises = require('fs').promises
const path = require("path")


const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', "starter.txt"), "utf8");
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', "starter.txt"));
        await fsPromises.writeFile(path.join(__dirname, 'files', "promiseWritten.txt"), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', "promiseWritten.txt"), " \n\nNice to meet you Mr Promise");
        await fsPromises.rename(path.join(__dirname, 'files', "promiseWritten.txt"), path.join(__dirname, 'files', "promiseRenamed.txt"));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', "promiseRenamed.txt"), "utf8");
        console.log(newData);
    } catch (error) {
        console.error(error);
    }
}

fileOps();

process.on('uncaughtException', error => {
    console.error(`There was in uncaught error: ${error}`)
    process.exit(1)
})