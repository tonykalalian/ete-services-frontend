import { useState, useEffect } from "react";
import axios from "axios";

const countries = ["Lebanon", "Dubai", "UK", "Canada", "India", "Other"];

function App() {
  // State
  const [employees, setEmployees] = useState(null);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    age: "",
    country: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    fullName: "",
    email: "",
    age: "",
    country: "",
  });

  // Use effect
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // Fetch the employees
      const res = await axios.get("http://localhost:3000/employee/list");
      setEmployees(res.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/employee/post",
        createForm
      );
      setEmployees([...employees, res.data.employee]);
      setCreateForm({
        fullName: "",
        email: "",
        age: "",
        country: "",
      });
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const deleteEmployee = async (_id) => {
    try {
      // Delete the employee
      await axios.delete(`http://localhost:3000/employee/delete/${_id}`);
      // Update state
      const newEmployees = employees.filter((employee) => employee._id !== _id);
      setEmployees(newEmployees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (employee) => {
    setUpdateForm({
      ...employee,
    });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      // Send the update request
      const { fullName, email, age, country, _id } = updateForm;
      const res = await axios.put(
        `http://localhost:3000/employee/update/${_id}`,
        {
          fullName,
          email,
          age,
          country,
        }
      );
      // Update state
      const updatedEmployees = employees.map((employee) =>
        employee._id === _id ? res.data.employee : employee
      );
      setEmployees(updatedEmployees);
      // Clear update form state
      setUpdateForm({
        _id: null,
        fullName: "",
        email: "",
        age: "",
        country: "",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Employees:</h2>
        {employees &&
          employees.map((employee) => (
            <div key={employee._id}>
              <h2>{employee.fullName}</h2>
              <h5>{employee.email}</h5>
              <h5>{employee.age}</h5>
              <h5>{employee.country}</h5>
              <button onClick={() => deleteEmployee(employee._id)}>
                Delete Employee
              </button>
              <button onClick={() => toggleUpdate(employee)}>
                Update Employee
              </button>
            </div>
          ))}
      </div>

      {updateForm._id ? (
        <div>
          <h2>Update Employee</h2>
          <form onSubmit={updateEmployee}>
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.fullName}
              name="fullName"
              placeholder="Full Name"
            />
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.email}
              name="email"
              placeholder="Email"
            />
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.age}
              name="age"
              placeholder="Age"
            />
            <select
              onChange={handleUpdateFieldChange}
              value={updateForm.country}
              name="country"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <button type="submit">Update Employee</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Create Employee</h2>
          <form onSubmit={createEmployee}>
            <input
              onChange={updateCreateFormField}
              value={createForm.fullName}
              name="fullName"
            />
            <input
              onChange={updateCreateFormField}
              value={createForm.email}
              name="email"
            />
            <input
              onChange={updateCreateFormField}
              value={createForm.age}
              name="age"
            />
            <select
              onChange={updateCreateFormField}
              value={createForm.country}
              name="country"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <button type="submit">Create Employee</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
