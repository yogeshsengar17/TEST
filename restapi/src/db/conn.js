const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/student-test',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected successfully");
}).catch((e)=>{
    console.log("database not connected successfully");
});