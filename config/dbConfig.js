const mongoose = require('mongoose');

const ConnectDB =  async() =>{
    try{
        await mongoose.connect(process.env.MONGOOSE_CON);
    } catch(err){
        console.log(err);
    }
    
}

module.exports = ConnectDB;