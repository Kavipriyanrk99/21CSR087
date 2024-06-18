const { logEvents } = require('./logEvents');


const errHandler = (err, req, res, next) => {
    const message = `${err.name}\t${err.message}`;
    const filename = "errLog.txt";
    logEvents(message, filename);

    next();
}


module.exports = { errHandler };