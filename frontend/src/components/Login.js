import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { loginUser } = useUser();
  const [dataUser, setDataUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleInputs = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(dataUser, navigate);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="container text-center">
              <i
                className="fas fa-user fa-5x mt-2"
                style={{ color: "green" }}
              ></i>
              <div className="card-header text-center mt-3">
                <h5>Login</h5>
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

export default Login;
