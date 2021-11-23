const mongoose = require("mongoose");

const TimeTableSchema = new mongoose.Schema({
  monday: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      from: String,
      to: String,
    },
  ],
  tuesday: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      from: String,
      to: String,
    },
  ],
  wednesday: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      from: String,
      to: String,
    },
  ],
  thursday: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      from: String,
      to: String,
    },
  ],
  friday: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      from: String,
      to: String,
    },
  ],
});

module.exports = mongoose.model("TimeTable", TimeTableSchema);
