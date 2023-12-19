const fs = require('fs');
const path = require('path');


if (!fs.existsSync('./new')){
    fs.mkdir(path.join(__dirname, "new"), (error) => {
    if (error) throw error; 
    console.log('Directory Created')
  })
} else if (fs.existsSync('./new')){
    fs.rmdir(path.join(__dirname, "new"), (error) => {
    if (error) throw error; 
    console.log('Directory removed')
  })
}



