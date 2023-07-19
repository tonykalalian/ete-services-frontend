import React from "react";

const EmployeeForm = ({
  formValues,
  handleSubmit,
  handleChange,
  countries,
  togglePopup,
}) => {
  return (
    <div className="container">
      <h2>{formValues._id ? "Edit Employee" : "Create Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formValues.fullName}
            name="fullName"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            onChange={handleChange}
            value={formValues.email}
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            onChange={handleChange}
            value={formValues.age}
            name="age"
            placeholder="Age"
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            onChange={handleChange}
            value={formValues.country}
            name="country"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {formValues._id ? "Update Employee" : "Create Employee"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={togglePopup}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
