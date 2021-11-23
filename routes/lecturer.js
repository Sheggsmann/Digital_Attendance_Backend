const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Lecturer = require("../models/Lecturer");

router.get("/", async (req, res) => {
  const lecturers = await Lecturer.find().select("-password");
  res.send(lecturers);
});

router.post("/", async (req, res) => {
  // TODO: validate lecturer info
  try {
    let { name, password } = req.body;
    let lecturer = await Lecturer.findOne({ name: name });

    if (lecturer)
      return res.status(400).json({ msg: "The lecturer already exists" });

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    lecturer = new Lecturer({
      name,
      password,
    });

    await lecturer.save();
    res.status(200).json({ msg: "lecturer created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(`[SERVER ERROR]: ${err.message}`);
  }
});

module.exports = router;
