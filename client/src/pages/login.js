import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/_reset.scss";
import "../styles/_login.scss";

const Login = () => {
  // Model
  const [loginVariables, setLoginVariables] = useState({
    username: "",
    password: "",
  });

  // Controller
  const submitLoginForm = (e) => {
    e.preventDefault();
    console.log(loginVariables);
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
          <input type="text" placeholder="Enter Username" id="username" value={loginVariables.username} onChange={(e) => setLoginVariables({ ...loginVariables, username: e.target.value })} required />
          <label className="lbl-password" htmlFor="password">
            Password
          </label>
          <input type="password" placeholder="Enter Password" id="password" value={loginVariables.password} onChange={(e) => setLoginVariables({ ...loginVariables, password: e.target.value })} required />
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
