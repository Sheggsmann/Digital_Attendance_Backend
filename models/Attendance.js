const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  courseTitle: String,
  start: { type: Date, default: Date.now },
  end: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
