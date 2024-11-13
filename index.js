const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
const {logger, logEvent} = require('./middleware/logger.js')

const app = express();
const PORT = 3500;

// app.use(cors);
app.use(cookieParser());
app.use(express.json());

app.use(logger);

app.get('/', (req, res)=>{
    console.log("hi");
    res.status(200);
    res.json({message: "success"});
})

app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));



