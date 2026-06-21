const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const EMP_FILE = "employees.json";

// GET all employees
app.get("/employees", (req, res) => {
  const data = fs.existsSync(EMP_FILE) ? JSON.parse(fs.readFileSync(EMP_FILE)) : [];
  res.json(data);
});

// POST new employee
app.post("/employees", (req, res) => {
  const newEmp = req.body;
  let data = fs.existsSync(EMP_FILE) ? JSON.parse(fs.readFileSync(EMP_FILE)) : [];
  data.push(newEmp);
  fs.writeFileSync(EMP_FILE, JSON.stringify(data, null, 2)); // save permanently
  res.json({ message: "Employee added successfully" });
});

// PUT updated employees array (used for delete and update)
app.put("/employees", (req, res) => {
  const updatedData = req.body; // expects full employee array
  fs.writeFileSync(EMP_FILE, JSON.stringify(updatedData, null, 2));
  res.json({ message: "Employees updated successfully" });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));