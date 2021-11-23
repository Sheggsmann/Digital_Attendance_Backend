const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const TimeTable = require("../models/TimeTable");

// @route GET api/departments
// @desc  fetch all departments from db
// @access Public
router.get("/", async (req, res) => {
  const departments = await Department.find();
  return res.send(departments);
});

// @route POST api/departments
// @desc  create a department
// @access Admin
router.post("/", async (req, res) => {
  // TODO: validate department data
  try {
    let { name } = req.body;
    let department = await Department.findOne({ name });
    if (department) {
      return res.status(400).json({ msg: "department already exists" });
    }

    department = new Department({ name });
    await department.save();

    return res.send(department);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`[SERVER ERROR]: ${err.message}`);
  }
});

// @route POST api/departments/add_timetable
// @desc  create timetable
// @access Admin
router.post("/:name/:level/create_timetable", async (req, res) => {
  // TODO: validate timetable data

  const department = await Department.findOne({ name: req.params.name });
  if (!department) {
    return res.status(400).json({ msg: "department not found" });
  }
});

module.exports = router;
