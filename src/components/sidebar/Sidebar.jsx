// icons
import RssFeedIcon from "@mui/icons-material/RssFeed";
import GroupsIcon from "@mui/icons-material/Groups";
import MailIcon from "@mui/icons-material/Mail";

import "./sidebar.css";

import { Link } from "react-router-dom";
import OnlineCard from "../OnlineCard/OnlineCard";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/">
            <li className="sidebarListItem">
              <RssFeedIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>
          <Link to="/chats">
            <li className="sidebarListItem">
              <MailIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
          </Link>
          <Link to="/groups">
            <li className="sidebarListItem">
              <GroupsIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </li>
          </Link>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <div className="sidebar__onlineCardsContainer">
          <span className="sidebar__onlineCardsHeader">People Online</span>
          <OnlineCard />
        </div>
        <hr className="sidebarHr" />
        <ul className="sidebar__FooterLinks">
          <li>
            <Link to="/about" style={{ textDecoration: "none" }}>
              About
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="#">
              Contact
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="#">
              Report a Problem
            </Link>
          </li>
        </ul>
        <p> &copy; 2021</p>
      </div>
    </div>
  );
}
