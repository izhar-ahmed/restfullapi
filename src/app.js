const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const port = process.env.PORT || 3000;


const app = express();

app.use(express.json());

// Create a new students
app.post("/students", async (req, res) => {


    try {
        const user = new Student(req.body);
        const createStudents = await user.save();
        res.status(201).send(createStudents);
    }
    catch (e) {
        res.status(400).send(e);
    }

});

// read all registerd students

app.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

//read a perticular student data by id

app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        res.send(studentData);

    } catch (e) {
        res.send(e);
    }
})

//read a perticular student by its name

// app.get("/students/:name", async(req, res)=>{
//     try{

//         const name = req.params.name;
// const studentName = await Student.find({name: name});
// res.send(studentName);
// console.log(name);
// if(!studentName){
//     return res.status(404).send();
// }else{
//     res.send(studentName);

// }


//     }catch(e){
//            res.status(500).send(e);
//     }
// })

//Update students by its Id

app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudent);
    } catch (e) {
        res.status(500).send(e);
    }
})

//delete student by its Id

app.delete("/students/:id", async (req, res) => {
    try {

        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        res.send("delete successfuly");

    } catch (e) {
        res.status(500).send(e);
    }
})


app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
});