require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const cors = require('cors');
const mongoose = require('mongoose');
const { logger } = require('./middlewares/logEvents');
const { errHandler } = require('./middlewares/errHandler');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./configs/dbConnection');


const PORT = process.env.PORT || 5500; 

connectDB();

app.use(logger);

app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/numbers', require('./routes/numbers'));



app.get(`^(/|/index(.html)?)$`, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errHandler);

mongoose.connection.once('open', () => {
    console.log(`connected to mongodb at ${process.env.DATABASE_URI}`);
    app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
})