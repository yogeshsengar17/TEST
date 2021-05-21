const express = require('express');
const port= process.env.PORT || 8000;
require('./db/conn');
const Student= require('./models/students');
const app = express();

app.use(express.json());

app.post('/students',async(req,res)=>{
    try{
        console.log(req.body);
        const studentTest= new Student(req.body);
        const insertStudent= await studentTest.save();
        res.status(201).send(insertStudent);
    }catch(e){
        res.status(400).send(e);
    }
});

app.get('/highestmarks',async(req,res)=>{
    try{
        const getStudent= await Student.find({});
        console.log("obtained data is:",getStudent);
        var total_marks_array=[]
        for(var i =0;i<=getStudent.length-1;i++){
            var total_marks=0;
            console.log("each student marks",getStudent[i]["test1"]);
            total_marks=total_marks+getStudent[i]["test1"]+getStudent[i]["test2"]+getStudent[i]["test3"]
            console.log("total marks for each student:",total_marks);
            total_marks_array.push(total_marks);

        }
        console.log("maxium marks",total_marks_array)
        var highestMarks=0;
        highestMarksIndex=0
        for(i=0;i<=total_marks_array.length-1;i++){
            if(total_marks_array[i]> highestMarks){
                highestMarks=total_marks_array[i];
                highestMarksIndex=i
                
            }
            
        }
       
        var flag=0;
        for(i=0;i<=total_marks_array.length-1;i++){
            if(highestMarks==total_marks_array[i]){
                if(highestMarksIndex==i){
                    flag=0
                }
                else {
                    flag=1
                }
            }
        }
        if(flag=0){
            res.status(201).send([getStudent[highestMarksIndex]])
        }
        else{
            response=[]
            indexArray=[]
            for(i=0;i<=total_marks_array.length-1;i++){
                if(highestMarks==total_marks_array[i]){
                    response.push(getStudent[i]);
                }
            }
            res.status(201).send(response);
        }




    }catch(e){
        res.status(400).send(e);
    }
});


app.get('/averagemarks',async(req,res)=>{
    try{
        const getStudent= await Student.find({});
        console.log("obtained data is:",getStudent);
        var total_marks_array=[]
        for(var i =0;i<=getStudent.length-1;i++){
            var total_marks=0;
            console.log("each student marks",getStudent[i]["test1"]);
            total_marks=(total_marks+getStudent[i]["test1"]+getStudent[i]["test2"]+getStudent[i]["test3"])/3
            console.log("total marks for each student:",total_marks);
            total_marks_array.push(total_marks);

        }
        console.log("maxium marks",total_marks_array)
        var highestMarks=0;
        highestMarksIndex=0
        for(i=0;i<=total_marks_array.length-1;i++){
            if(total_marks_array[i]> highestMarks){
                highestMarks=total_marks_array[i];
                highestMarksIndex=i
            }
        }
        var flag=0;
        for(i=0;i<=total_marks_array.length-1;i++){
            if(highestMarks==total_marks_array[i]){
                if(highestMarksIndex==i){
                    flag=0
                }
                else {
                    flag=1
                }
            }
        }
        if(flag=0){
            res.status(201).send([getStudent[highestMarksIndex]]);
        }
        else{
            response=[]
            indexArray=[]
            for(i=0;i<=total_marks_array.length-1;i++){
                if(highestMarks==total_marks_array[i]){
                    response.push(getStudent[i]);
                }
            }
            res.status(201).send(response);
        }




    }catch(e){
        res.status(400).send(e);
    }
});



app.listen(port,()=>{
    console.log(`connected the server at the port:${port}`)
})