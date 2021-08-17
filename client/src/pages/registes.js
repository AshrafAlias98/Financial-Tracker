import "./App.css";

const App = () => {
  return (
    <div>
      <div className="card-wrapper-flex">
        <form action="">
          <div className="card-container">
            <h1>Welcome</h1>

            <label htmlFor="lbl-username">Username</label>
            <input type="text" placeholder="Enter Username" id="username" required />

            <label htmlFor="lbl-email">Email</label>
            <input type="text" placeholder="Enter Email" id="email" required />

            <label htmlFor="lbl-password">Password</label>
            <input type="password" placeholder="Enter Password" id="password" required />

            <label htmlFor="lbl-password-repeat">Confirm Password</label>
            <input type="password" placeholder="Enter Confirm Password" id="password-repeat" required />

            <button type="submit" className="btn-register">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
