const express = require("express");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Lecturer = require("../models/Lecturer");

const router = express.Router();

// @route POST login for students
// @desc login route for students
// @access PUBLIC
router.post("/student", async (req, res) => {
  const { matric_no, password } = req.body;
  const student = await Student.findOne({ matric_no });

  if (!student) {
    return res.status(400).json({ msg: "Student Does Not Exist" });
  }

  const correctPassword = await bcrypt.compare(password, student.password);
  if (!correctPassword) {
    return res.status(400).json({ msg: "Invalid Login" });
  }

  const token = student.genAuthToken();
  return res.json({ token });
});

// @route POST login for lecturers
// @desc login route for lecturers
// @access PUBLIC
router.post("/lecturer", async (req, res) => {
  const { name, password } = req.body;
  const lecturer = await Lecturer.findOne({ name });

  if (!lecturer) {
    return res.status(400).json({ msg: "Lecturer Does Not Exist" });
  }

  const correctPassword = await bcrypt.compare(password, lecturer.password);
  if (!correctPassword) {
    return res.status(400).json({ msg: "Invalid Login" });
  }

  const token = lecturer.genAuthToken();
  return res.json({ token });
});

module.exports = router;
