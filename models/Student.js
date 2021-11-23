const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 1000,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    matric_no: {
      type: String,
      unique: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    course_rep: {
      type: Boolean,
      default: false,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

StudentSchema.methods.genAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      matric_no: this.matric_no,
    },
    config.get("jwtPrivateKey")
  );
};

module.exports = mongoose.model("Student", StudentSchema);
