const express = require('express');
const fs = require('fs');
const router = express.Router();

const pathRouter = `${__dirname}`;

const removeExtension = ( file )=>{
    return file.split('.').shift();
}

const readPath = fs.readdirSync(pathRouter);
readPath.forEach( file => {
    const f = removeExtension(file);
    const skip = 'index'.includes(f);
    if(!skip){
        console.log('Cargar --->', f);
        const route = require(`./${f}`);
        router.use(`/${f}`, route);
    }
});


module.exports = router;