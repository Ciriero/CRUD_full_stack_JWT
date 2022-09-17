const mongoose = require("mongoose");

const employeeScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [30, "Your name cannot exceed 30 characters"],
    },
    surname: {
      type: String,
      required: true,
      maxlength: [30, "Your name cannot exceed 30 characters"],
    },
    id: {
      type: String,
      required: true,
    },
    tcontract: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeScheme);
