import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";

const ModalActions = ({ open, onCloseModal, getEmployees, edit, employee }) => {
  const { user } = useUser();

  const initialState = {
    name: "",
    surname: "",
    id: "",
    tcontract: "Fijo",
  };

  const [dataEmployee, setDataEmployee] = useState(initialState);
  const tcontract = ["Fijo", "Eventual", "Prácticas"];
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDataEmployee({ ...dataEmployee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    edit ? setDataEmployee(employee) : setDataEmployee(initialState);
  }, [edit, employee]);

  const saveEmployee = async () => {
    try {
      const { data } = await axios.post("/employees/create", dataEmployee);
      console.log(data);
      Swal.fire({
        icon: "success",
        title: data.text,
        showConfirmButton: false,
        timer: 1500,
      });
      onCloseModal();
      getEmployees();
    } catch (error) {
      if (error.response.data.message) {
        return Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const updateEmployee = async () => {
    try {
      const { data } = await axios.put(
        `/employees/update/${employee._id}`,
        dataEmployee
      );
      console.log(data);
      Swal.fire({
        icon: "success",
        title: data.text,
        showConfirmButton: false,
        timer: 1500,
      });
      onCloseModal();
      getEmployees();
    } catch (error) {
      if (error.response.data.message) {
        return Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const actions = (e) => {
    e.preventDefault();
    edit ? updateEmployee() : saveEmployee();
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="card">
          <div className="card-header">
            <h5>{edit ? "Update Empleado" : "Add Empleado"}</h5>
            Employee
          </div>
          <div className="card-body">
            <form onSubmit={actions}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.name}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  name="surname"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.surname}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Id</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.id}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contract</label>
                <select
                  name="tcontract"
                  className="form-select"
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.tcontract}
                >
                  {tcontract.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              {!loading ? (
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                  >
                    {edit ? "Update" : "Save"}
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary form-control" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {/* {edit ? " Updating" : "Saving"} */} Envio
                </button>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalActions;
