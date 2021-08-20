import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Options from "./pages/options/Options";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import About from "./pages/about/About";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route path="/options">
          {user ? <Options /> : <Redirect to="/" />}
        </Route>
        <Route path="/messenger">
          {user ? <Messenger /> : <Redirect to="/" />}
        </Route>
        <Route path="/about">{user ? <About /> : <Redirect to="/" />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
