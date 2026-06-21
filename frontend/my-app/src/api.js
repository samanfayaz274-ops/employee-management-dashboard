const API = "http://localhost:5000/employees";

// GET all employees
export async function getEmployees() {
  const res = await fetch(API);
  return await res.json();
}

// ADD a new employee
export async function addEmployeeData(emp) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emp),
  });
  return res.json();
}

// UPDATE employees (for delete or edit)
export async function updateEmployees(employees) {
  const res = await fetch(API, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employees),
  });
  return res.json();
}