const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const studentRouter = require("./routers/student");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(studentRouter);

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
});