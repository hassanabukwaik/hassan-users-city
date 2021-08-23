const mongoose = require("mongoose");
const isEmail= require("validator");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[true,"please enter name"],
      unique:true,
      lowercase:true,
      trim:true,
      minLength : [2,"minimum 2letters"],
      maxLength:30
    },
    email: {
      type: String,
      required:[true,"please enter email"],
      unique:true,
      validate:[isEmail,"please enter vaild email"],

    },
    age: {
      type: Number,
      required: true,
      min:18,
      max:100
    
    },
    skills:{
      type: String,
      required:  [true,"minimum 2letters"],
      lowercase:true,
      enum:["front end","backend","web","react","nodejs","java","react js"]
      
    },
    city: {
      type: mongoose.Schema.ObjectId,
      ref: "City",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
