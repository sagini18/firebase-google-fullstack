const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const Employee = require("./models/employee.model");

mongoose
  .connect("mongodb://localhost:27017/employee")
  .then(() => console.log("DB is connected!"));

app.post("/register", (req, res) => {
  if (req.body.email !== undefined) {
    Employee.create(req.body)
      .then((emp) => res.json(emp))
      .catch((err) => console.log(err));
  }
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Employee.findOne({ email }).then((user) =>
    user
      ? user.password === password
        ? res.json("Success")
        : res.json("Incorrect Password")
      : res.json("Not Exist Account")
  );
});
app.get("/users/:email", async (req, res) => {
  const users = await Employee.find({ email: req?.params?.email });
  if (users.length > 0) {
    const { name } = users[0];
    console.log("username", name);
    res.json(name);
  } else {
    res.json(undefined);
  }
});
app.post("/addPhoneNumber", async (req, res) => {
  const { email, phoneNumber } = req.body;
  Employee.findOneAndUpdate({ email })
    .then((user) => {
      user.phoneNumber = phoneNumber;
      user.save();
      res.json(user);
    })
    .catch((err) => res.json(err));
});

app.listen(3001, () => console.log("Server is running!"));
