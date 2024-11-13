const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const {format}  = require('date-fns');
// const {v4:uuid} = require('uuid')

const logEvent = async(message, fileName) =>{
    try{
        const dataTime = format(new Date, 'yyyyMMdd\tHH:mm:ss');
        const logItem = `${dataTime}\t${message}\n`;
        if(!fs.existsSync(path.join(__dirname, '..','logs'))){
            await fsPromise.mkdir(path.join(__dirname, '..','logs'));
        }
        await fsPromise.appendFile(path.join(__dirname, '..','logs',fileName), logItem);
    } catch(err){
        console.log(err.message);
    }
  
} 

const logger = ( req, res, next )=>{
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`,`reqLog.log`)
    console.log(`${req.method} ${req.path}`)
    next()   
}

module.exports = {logEvent, logger};