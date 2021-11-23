const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Lecturer = require("../models/Lecturer");

router.get("/", async (req, res) => {
  const courses = await Course.find();
  return res.send(courses);
});

// @route GET api/courses/:id
// @desc return a single course from the database
// @access PUBLIC
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(400).json({ msg: "Course not found" });
  }
  res.send(course);
});

// @route POST api/courses/:id
// @desc create a course
// @access ADMIN
router.post("/", async (req, res) => {
  // TODO: Validate course body
  // try {
  //   const { courseTitle, courseCode, units, lecturer } = req.body;
  //   const course = new Course({
  //     courseTitle,
  //     courseCode,
  //     units,
  //   });
  //   const lecturer = await Lecturer.findById(lecturer);
  //   if (lecturer) {
  //     course.lecturer = lecturer._id;
  //   }
  //   await course.save();
  //   lecturer.courses.push(course._id);
  //   await lecturer.save();
  //   return res.send(course);
  // } catch (err) {
  //   console.log(err);
  //   return res.status(500).send(`[SERVER ERROR]: ${err.message}`);
  // }
});

router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.id);
    return res.send(course);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`[SERVER ERROR]: ${err.message}`);
  }
});

module.exports = router;
