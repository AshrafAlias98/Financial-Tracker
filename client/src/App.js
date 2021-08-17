import "./App.scss";

const App = () => {
  return (
    <div>
      <div className="card-wrapper-flex">
        <p className="txt-quotes">
          Building wealth is a marathon,
          <br />
          not a sprint.
          <br />
          <br />
          <span className="bold">Discipline</span> is the key ingredient.
        </p>
        <form action="">
          <div className="card-container">
            <h1 className="welcome">Welcome</h1>

            <label className="lbl-username" htmlFor="username">
              Username
            </label>
            <input type="text" placeholder="Enter Username" id="username" required />

            <label className="lbl-password" htmlFor="password">
              Password
            </label>
            <input type="password" placeholder="Enter Password" id="password" required />

            <button type="submit" className="btn-login">
              Login
            </button>

            <p className="register">
              Do not have an account?&nbsp;
              <a href="{}" className="link-register">
                Sign up
              </a>
            </p>

            <p className="txt-demouser">Try a Demo User!</p>

            <button type="submit" className="btn-userA">
              User A
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
