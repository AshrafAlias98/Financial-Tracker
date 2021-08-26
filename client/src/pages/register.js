import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/_reset.scss";
import "../styles/_register.scss";

const Register = ({ isRegister }) => {
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
      .post("http://localhost:5000/register/add", registerVariables)
      .then((res) => res.data)
      .catch((err) => alert(err));

    // TODO: Display error within the input box itself for better UI/UX
  };

  return isNewUserVar ? (
    <div className="blur-background">
      <div className="registry-wrapper-flex">
        <form onSubmit={submitRegisterForm}>
          <div className="registry-container">
            <Link to="/" className="r-close-button">
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
