const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const port = process.env.PORT || 3000;


const app = express();

app.use(express.json());

// Create a new students
app.post("/students",async(req, res)=>{

   
    try {
        const user = new Student(req.body);
        const createStudents = await user.save();
        res.status(201).send(createStudents);
    }
    catch(e){
        res.status(400).send(e);
    }
 
});

// read all registerd students

app.get("/students",async(req, res)=>{
    try {
    const studentsData = await Student.find();
     res.send(studentsData);
    }catch(e){
        res.send(e);
    }
})

//read a perticular student data

app.get("/students/:id",async(req, res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        res.send(studentData);

    }catch(e){
           res.send(e);
    }
})


app.listen(port, ()=>{
    console.log(`connection is setup at ${port}`);
});