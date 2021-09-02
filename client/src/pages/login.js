import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/_reset.scss";
import "../styles/_login.scss";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [loginVariables, setLoginVariables] = useState({
    username: "",
    password: "",
  });

  const submitLoginForm = (e) => {
    e.preventDefault();

    // Check if login details are empty
    if (loginVariables.username === "") {
      userLoginError("Username must not be empty!");
    } else if (loginVariables.password === "") {
      userLoginError("Password must not be empty!");
    } else {
      // Get the user login details from DB using the username given by user
      axios
        .get("http://localhost:5000/login/" + loginVariables.username)
        .then((res) => verifyCredential(res.data))
        .catch((err) => userLoginError(err.response.data));
    }
  };

  const verifyCredential = (userData) => {
    if (userData.password === loginVariables.password) {
      userLoginSuccess(`Login successful. Welcome ${userData.username}!`);
      history.push("/home");
    } else {
      userLoginError("Password does not match!");
    }
  };

  const userLoginSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const userLoginError = (error) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="card-wrapper-flex">
      <p className="txt-quotes">
        Building wealth is a marathon,
        <br />
        not a sprint.
        <br />
        <br />
        <span className="bold">Discipline</span> is the key ingredient.
      </p>
      <form onSubmit={submitLoginForm}>
        <div className="card-container">
          <h1 className="welcome">Welcome</h1>
          <label className="lbl-username" htmlFor="username">
            Username
          </label>
          <input type="text" placeholder="Enter Username" id="username" value={loginVariables.username} onChange={(e) => setLoginVariables({ ...loginVariables, username: e.target.value })} />
          <label className="lbl-password" htmlFor="password">
            Password
          </label>
          <input type="password" placeholder="Enter Password" id="password" value={loginVariables.password} onChange={(e) => setLoginVariables({ ...loginVariables, password: e.target.value })} />
          <button type="submit" className="btn-login">
            Login
          </button>
          <p className="register">
            Do not have an account?&nbsp;
            <Link to="/register" className="link-register">
              Sign up
            </Link>
          </p>
          <p className="txt-demouser">Try a Demo User!</p>
          <button type="submit" className="btn-userA">
            User A
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
