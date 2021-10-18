import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { logoutCall } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import "./Options.css";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch, useSelector } from "react-redux";

function Options() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("refresh");

  const logOut = () => {
    dispatch(logoutCall(token));
  };

  return (
    <div className="options__pageContainer">
      <div className="page">
        <Sidebar className="sidebar" />
        <div className="pageContent">
          <List>
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>

            <Divider />

            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItem>

            <Divider />

            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Chats" />
              </ListItem>
            </Link>

            <Divider />

            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <Divider />

            <ListItem button onClick={logOut}>
              <ListItemIcon>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>

            <Divider />

            <Link
              to="/about"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </Link>

            <Divider />
          </List>
        </div>
      </div>
    </div>
  );
}

export default Options;
