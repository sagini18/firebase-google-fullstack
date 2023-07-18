const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  phoneNumber: { type: String },
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema);
module.exports = EmployeeModel;
