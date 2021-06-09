import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">Online Friends</ul>
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
