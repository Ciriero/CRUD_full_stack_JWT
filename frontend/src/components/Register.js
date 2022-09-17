import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Register = () => {
  const { registerUser } = useUser();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputs = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(dataUser, navigate);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="container text-center">
              <i
                className="fas fa-user-plus fa-5x mt-2"
                style={{ color: "blue" }}
              ></i>
              <div className="card-header text-center mt-3">
                <h5>Register</h5>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    autoFocus
                    onChange={handleInputs}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    autoFocus
                    onChange={handleInputs}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    autoFocus
                    onChange={handleInputs}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="form-control btn btn-primary mt-5"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
