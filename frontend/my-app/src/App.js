import React, { useEffect, useState } from "react";
import { getEmployees, addEmployeeData, updateEmployees } from "./api";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  // Load employees from backend
  const loadEmployees = async () => {
    let data = await getEmployees();

    // Filters
    if (deptFilter) data = data.filter(e => e.department.toLowerCase() === deptFilter.toLowerCase());
    if (statusFilter) data = data.filter(e => e.status.toLowerCase() === statusFilter.toLowerCase());
    if (search) data = data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, [deptFilter, statusFilter, search]);

  // Add employee
  const handleAdd = async () => {
    const name = prompt("Enter Name:");
    const department = prompt("Enter Department:");
    const salary = prompt("Enter Salary:");
    const status = prompt("Enter Status (Active/Inactive):");

    if (!name || !department || !salary || !status) {
      alert("All fields are required!");
      return;
    }

    const emp = { id: Date.now(), name, department, salary, status };
    await addEmployeeData(emp);
    loadEmployees();
  };

  // Delete employee
  const handleDelete = async (id) => {
    const data = await getEmployees();
    const updated = data.filter(e => e.id !== id);
    await updateEmployees(updated);
    loadEmployees();
  };

  // Stats
  const total = employees.length;
  const active = employees.filter(e => e.status.toLowerCase() === "active").length;
  const departments = [...new Set(employees.map(e => e.department))].length;
  const avgSalary = (employees.reduce((sum, e) => sum + Number(e.salary), 0) / (employees.length || 1)).toFixed(2);

  // Unique department options for filter
  const allDepartments = [...new Set(employees.map(e => e.department))];

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>

      <div className="stats">
        <div>Total Employees: {total}</div>
        <div>Active Employees: {active}</div>
        <div>Departments: {departments}</div>
        <div>Avg Salary: {avgSalary}</div>
        <button onClick={handleAdd}>Add Employee</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
          <option value="">All Departments</option>
          {allDepartments.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>{emp.status}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;