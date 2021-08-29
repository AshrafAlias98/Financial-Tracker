import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import "../styles/_reset.scss";
import "../styles/_register.scss";

const Register = ({ isRegister }) => {
  const history = useHistory();
  const [isNewUserVar, setIsNewUserVar] = useState(isRegister);
  const [registerVariables, setRegisterVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", registerVariables)
      .then((res) => userRegisterSuccess(res.data))
      .catch((err) => userRegisterError(err.response.data));

    // TODO: Display error within the input box itself for better UI/UX
  };

  const userRegisterSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Reset form
    setRegisterVariables({
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    });

    history.push("/login");
  };

  const userRegisterError = (err) => {
    if (Object.keys(err).length > 0) {
      Object.keys(err).forEach((key) => {
        toast.error(err[key], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  };

  return isNewUserVar ? (
    <div className="blur-background">
      <div className="registry-wrapper-flex">
        <form onSubmit={submitRegisterForm}>
          <div className="registry-container">
            <Link to="/login" className="r-close-button">
              <FontAwesomeIcon icon={faTimes} onClick={() => setIsNewUserVar(false)} />
            </Link>
            <h1 className="register">Create Account</h1>
            <label className="r-lbl-username" htmlFor="username">
              Username
            </label>
            <input type="text" placeholder="Enter Username" id="r-username" value={registerVariables.username} onChange={(e) => setRegisterVariables({ ...registerVariables, username: e.target.value })} />

            <label className="r-lbl-email" htmlFor="Email">
              Email
            </label>
            <input type="text" placeholder="Enter Email" id="r-email" value={registerVariables.email} onChange={(e) => setRegisterVariables({ ...registerVariables, email: e.target.value })} />

            <label className="r-lbl-password" htmlFor="password">
              Password
            </label>
            <input type="password" placeholder="Enter Password" id="r-password" value={registerVariables.password} onChange={(e) => setRegisterVariables({ ...registerVariables, password: e.target.value })} />

            <label className="r-lbl-confirm-password" htmlFor="password">
              Confirm Password
            </label>
            <input type="password" placeholder="Enter Confirm Password" id="r-confirm-password" value={registerVariables.confirmedPassword} onChange={(e) => setRegisterVariables({ ...registerVariables, confirmedPassword: e.target.value })} />

            <button type="submit" className="btn-register">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Register;
