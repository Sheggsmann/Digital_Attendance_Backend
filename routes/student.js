const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Department = require("../models/Department");

// @route GET api/students
// @desc  fetch all students from db
// @access Public
router.get("/", async (req, res) => {
  const students = await Student.find().sort("name").select("-password");
  return res.send(students);
});

// @route GET api/me
// @desc  get current user info
// @access Private
router.get("/me", async (req, res) => {
  const student = await Student.findById(req.user.id).select("-password");
  return res.send(student);
});

// @route POST api/students
// @desc register a new student in the database
// @access Public
router.post("/", async (req, res) => {
  // TDOD: validate incoming info

  try {
    let { name, email, password, level, matric_no, department } = req.body;
    let student = await Student.findOne({ matric_no });
    if (student) {
      return res.status(400).json({ msg: "student already exists" });
    }

    department = await Department.findOne({ name: department });
    // if (!department) {
    //   return res.status(400).json({ msg: "no department given" });
    // }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    student = new Student({
      name,
      email,
      password,
      level,
      matric_no,
      department,
    });

    await student.save();

    return res.status(200).json({ msg: "student created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(`[SERVER ERROR]: ${err.message}`);
  }
});

module.exports = router;
