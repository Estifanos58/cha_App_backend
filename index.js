const express = require('express');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const path = require('path');
const PORT = process.env.PORT || 7500;

const app = express();
app.use(cors);
app.use(cookie_parser);

app.get('/', (req, res)=>{
    res.json({message: 'sucess'});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
