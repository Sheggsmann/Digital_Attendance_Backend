const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const LecturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  courseIsActive: {
    type: Boolean,
    default: false,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
});

LecturerSchema.methods.genAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      courseIsActive: this.courseIsActive,
    },
    config.get("jwtPrivateKey")
  );
};

module.exports = mongoose.model("Lecturer", LecturerSchema);
