import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EmployeesTable = ({
  employees,
  handleEditEmployee,
  handleDeleteEmployee,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteEmployee(null);
  };

  const handleShowModal = (employee) => {
    setDeleteEmployee(employee);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteEmployee) {
      handleDeleteEmployee(deleteEmployee._id);
    }
    handleCloseModal();
  };

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Country</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.age}</td>
              <td>{employee.country}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => handleEditEmployee(employee)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleShowModal(employee)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete employee:{" "}
          {deleteEmployee && deleteEmployee.fullName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeesTable;
