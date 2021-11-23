const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  code: String,
  units: Number,
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer" },
});

module.exports = mongoose.model("Course", CourseSchema);
