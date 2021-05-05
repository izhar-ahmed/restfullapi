const express = require("express");
const Student = require("../models/students");

const router = new express.Router();

// Create a new students
router.post("/students", async (req, res) => {


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

router.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

//read a perticular student data by id

router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        res.send(studentData);

    } catch (e) {
        res.send(e);
    }
})


//Update students by its Id

router.patch("/students/:id", async (req, res) => {
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

router.delete("/students/:id", async (req, res) => {
    try {

        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        res.send("successfuly deleted");

    } catch (e) {
        res.status(500).send(e);
    }
})


module.exports = router;