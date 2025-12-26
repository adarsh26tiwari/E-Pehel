// User schema for authentication and role management

import mongoose
from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String},
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
     },
  role: {
      type: String,
      enum: ['student', 'educator'],
      required: true
     },
  photoURL: {
    type: String,
    default: ''
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses"
  }]

}, { timestamps: true });
    
const User = mongoose.model("User", userSchema);

export default User;