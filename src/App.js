import { useEffect } from "react";
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
// import Messenger from "./pages/messenger/Messenger";
import About from "./pages/about/About";
import { useSelector, useDispatch } from "react-redux";
import { load_user } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_user());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Switch>
        <Route exact path="/feed">
          {user ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route path="/more">
          {user ? <Options /> : <Redirect to="/login" />}
        </Route>
        {/* <Route path="/messenger">
            {user ? <Messenger /> : <Redirect to="/" />}
          </Route> */}
        <Route path="/about">{user ? <About /> : <Redirect to="/" />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
