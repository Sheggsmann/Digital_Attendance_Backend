const express = require("express");
const app = express();
const connectDb = require("./start/db");
const auth = require("./routes/auth");
const students = require("./routes/student");
const departments = require("./routes/department");
const courses = require("./routes/course");
const lecturers = require("./routes/lecturer");

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
(async () => await connectDb())();

app.use("/api/auth", auth);
app.use("/api/students", students);
app.use("/api/departments", departments);
app.use("/api/courses", courses);
app.use("/api/lecturers", lecturers);

const server = app.listen(
  PORT,
  console.log(`SERVER RUNNING ON PORT : ${PORT}`)
);

module.exports = server;
