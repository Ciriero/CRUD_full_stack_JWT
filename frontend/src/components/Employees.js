import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import { Modal } from "react-responsive-modal";
import ModalActions from "./ModalActions";

const Employees = () => {
  const { user } = useUser();
  const [employees, setEmployees] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const getEmployees = async () => {
    try {
      const { data } = await axios.get("/employees/listboss", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEmployees(data.employees);
      console.log(data.employees);
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

  useEffect(() => {
    getEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete("/employees/delete/" + id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        //después de eliminar obtenemos de nuevo todos los empleados
        getEmployees();
        Swal.fire({
          icon: "success",
          title: data.text,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  //modal
  const [employee, setEmployee] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpenModal = (edit, employee) => {
    setOpen(true);
    setEdit(edit);
    setEmployee(employee);
  };

  const onCloseModal = () => setOpen(false);

  // Búsqueda
  const filtered = employees.filter((value) => {
    if (inputSearch === "" || value.name.toLowerCase().includes(inputSearch)) {
      return value;
    }
  });

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <button
              className="btn btn-primary"
              onClick={() => onOpenModal(false, {})}
            >
              <i className="fas fa-plus"></i> Add Employee
            </button>
          </div>
          <div className="col-md-6 ml-auto">
            <div className="input-group">
              <input
                className="form-control"
                type="Search"
                placeholder="Search..."
                aria-label="Search"
                onChange={(e) => setInputSearch(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Empleados -- {user.name}</h4>
                </div>
                <div className="table-responsive-lg">
                  <table className="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Id</th>
                        <th>Contract</th>
                        <th>Options</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((item, i) => (
                        <tr key={item._id}>
                          <td>{i + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.surname}</td>
                          <td>{item.id}</td>
                          <td>{item.tcontract}</td>

                          <td>
                            <button
                              className="btn btn-danger me-1"
                              onClick={() => deleteEmployee(item._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                            <button
                              className="btn btn-warning"
                              onClick={() => onOpenModal(true, item)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalActions
        open={open}
        onCloseModal={onCloseModal}
        getEmployees={getEmployees}
        edit={edit}
        employee={employee}
      />
    </div>
  );
};

export default Employees;
