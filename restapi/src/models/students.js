const mongoose = require('mongoose');
const validator= require('validator');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email id is already is present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid Email");
            }
        }
    },
    test1:{
        type:Number,
        required:true,
        min:0,
        max:10
    },
    test2:{
       type:Number,
       required:true,
       min:0,
       max:10 
    },
    test3:{
        type:Number,
        required:true,
        min:0,
        max:10
    }


});

 // we will create a model
 const Student = new mongoose.model('Student',studentSchema);
 module.exports= Student;