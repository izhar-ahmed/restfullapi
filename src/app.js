const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const port = process.env.PORT || 3000;


const app = express();

app.use(express.json());

// Create a new students
app.post("/students",(req, res)=>{
    console.log(req.body);
    const user = new Student(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});


app.listen(port, ()=>{
    console.log(`connection is setup at ${port}`);
});