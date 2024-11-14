const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
const {logger, logEvent} = require('./middleware/logger.js');
const ConnectDB = require('./config/dbConfig.js');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3500;

ConnectDB();

// app.use(cors);
app.use(cookieParser());
app.use(express.json());

app.use(logger);

app.get('/', (req, res)=>{
    console.log("hi");
    res.status(200);
    res.json({message: "success"});
})

// app.use('/user', require('./routes/userRoute.js'))

mongoose.connection.once('open', ()=>{
    console.log('Connnected to MongoDb');
    app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));
})

mongoose.connection.on('error', (err)=>{
    console.log(err)
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})




