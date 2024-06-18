const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');
const datefns = require('date-fns');
const uuid = require('uuid');

const logEvents = async(message, filename) => {
    try {
        const logData = `${datefns.format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')}\t${uuid.v4()}\t${message}\n`;

        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
            console.log('logs directory created');
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', filename), logData);
    } catch (err) {
        console.log(err);
    }
}


const logger = (req, res, next) => {
    const message = `${req.method}\t${req.headers.origin}\t${req.url}`;
    const filename = "reqLog.txt";
    logEvents(message, filename);

    next();
} 


module.exports = { logEvents, logger };