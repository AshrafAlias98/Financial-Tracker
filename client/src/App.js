import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
  return (
    <Router>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register isRegister={true} />
      </Route>
    </Router>
  );
};

export default App;
