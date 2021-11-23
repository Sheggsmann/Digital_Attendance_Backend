const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  l_100: {
    timeTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeTable",
    },
  },
  l_200: {
    timeTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeTable",
    },
  },
  l_300: {
    timeTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeTable",
    },
  },
  l_400: {
    timeTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeTable",
    },
  },
  l_500: {
    timeTable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeTable",
    },
  },
});

module.exports = mongoose.model("Department", DepartmentSchema);
