import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserContext = createContext();
const initialState = { login: false, token: "", user: "" };

export const UserProvider = (props) => {
  const [user, setUser] = useState(initialState);

  //Al recargar no perdemos el login

  useEffect(() => {
    const initial = JSON.parse(localStorage.getItem("user"));
    initial ? initial.login && setUser(initial) : setUser(initialState);
  }, []);

  //función de login

  const loginUser = async (dataUser, navigate) => {
    try {
      const { data } = await axios.post("/users/login", dataUser);
      console.log(data);
      if (data.token) {
        const userLogin = {
          login: true,
          token: data.token,
          name: data.name,
        };
        //guardamos en localstorage
        localStorage.setItem("user", JSON.stringify(userLogin));
        setUser(userLogin);
        navigate("/employees");
        Swal.fire({
          icon: "success",
          title: data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (error.response.data.message) {
        return Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(error.response.data.message);
    }
  };

  const registerUser = async (dataUser, navigate) => {
    try {
      const { data } = await axios.post("/users/register", dataUser);
      console.log(data);
      if (data.token) {
        const userLogin = {
          login: true,
          token: data.token,
          name: data.name,
        };
        //guardamos en localstorage
        localStorage.setItem("user", JSON.stringify(userLogin));
        setUser(userLogin);
        navigate("/employees");
        Swal.fire({
          icon: "success",
          title: data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (error.response.data.message) {
        return Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(error.response.data.message);
    }
  };

  //función de logout

  const exit = () => {
    setUser(initialState);
    localStorage.removeItem("user");
  };

  const value = {
    loginUser,
    registerUser,
    user,
    exit,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser error");
  }
  return context;
}
