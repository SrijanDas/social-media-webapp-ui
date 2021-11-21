import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Registerr from "./pages/Registerr/Registerr";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";
import About from "./pages/About/About";
import Layout from "./layout/Layout";
import { useSelector } from "react-redux";
import People from "./pages/People/People";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import Posts from "./pages/Posts";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/feed">
            {user ? <Redirect to="/" /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>

          <Route path="/profile/:userId">
            {user ? <Profile /> : <Redirect to="/" />}
          </Route>

          <Route path="/about">{user ? <About /> : <Redirect to="/" />}</Route>
          <Route path="/people">
            {user ? <People /> : <Redirect to="/" />}
          </Route>
          <Route path="/notifications">
            {user ? <NotificationsPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/posts/:postId">
            <Posts />
          </Route>

          {/* ---------- messeges --------- */}
          <Route path="/chat">
            {user ? <Messenger /> : <Redirect to="/" />}
          </Route>

          {/*  -------------- auth routes --------------- */}
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Registerr />}
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
