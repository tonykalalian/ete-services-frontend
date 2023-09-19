import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import WelcomePage from "./components/WelcomePage";
import EmployeesTable from "./components/EmployeesTable";
import EmployeeForm from "./components/EmployeeForm";

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
  const [showPopup, setShowPopup] = useState(false);

  // Use effect
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // Fetch the employees
      const res = await axios.get("https://ete-services-api.onrender.com/employee/list");
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
        "https://ete-services-api.onrender.com/employee/post",
        createForm
      );
      setEmployees([...employees, res.data.employee]);
      setCreateForm({
        fullName: "",
        email: "",
        age: "",
        country: "",
      });
      setShowPopup(false);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const deleteEmployee = async (_id) => {
    try {
      // Delete the employee
      await axios.delete(`https://ete-services-api.onrender.com/employee/delete/${_id}`);
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
    setShowPopup(true);
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      // Send the update request
      const { fullName, email, age, country, _id } = updateForm;
      const res = await axios.put(
        `https://ete-services-api.onrender.com/employee/update/${_id}`,
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
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="container">
      <WelcomePage />
      <div>
        <h2>Employees:</h2>
        {employees && (
          <EmployeesTable
            employees={employees}
            handleEditEmployee={toggleUpdate}
            handleDeleteEmployee={deleteEmployee}
          />
        )}
        <button type="button" className="btn btn-primary" onClick={togglePopup}>
          Add Employee
        </button>
      </div>

      {showPopup && (
        <EmployeeForm
          formValues={updateForm._id ? updateForm : createForm}
          handleSubmit={updateForm._id ? updateEmployee : createEmployee}
          handleChange={
            updateForm._id ? handleUpdateFieldChange : updateCreateFormField
          }
          countries={countries}
          togglePopup={togglePopup}
        />
      )}
    </div>
  );
}

export default App;
