import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register isRegister={true} />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Router>
  );
};

export default App;
