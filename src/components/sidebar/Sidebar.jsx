// icons
import RssFeedIcon from "@mui/icons-material/RssFeed";
import GroupsIcon from "@mui/icons-material/Groups";
import MailIcon from "@mui/icons-material/Mail";

import "./sidebar.css";

import { Link, useHistory } from "react-router-dom";
import OnlineCard from "../OnlineCard/OnlineCard";

export default function Sidebar() {
  const history = useHistory();
  const listItems = [
    {
      text: "Feed",
      icon: <RssFeedIcon />,
      link: "/",
    },
    {
      text: "Chats",
      icon: <MailIcon />,
      link: "/chats",
    },
    {
      text: "Groups",
      icon: <GroupsIcon />,
      link: "/groups",
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {listItems.map((item, index) => (
            <li
              key={index}
              className="sidebarListItem"
              onClick={() => history.push(item.link)}
            >
              <div className="sidebarIcon">{item.icon}</div>
              <span className="sidebarListItemText">{item.text}</span>
            </li>
          ))}
        </ul>

        {/* <button className="sidebarButton">Show More</button> */}
        <hr className="sidebarHr" />
        <div className="sidebar__onlineCardsContainer">
          <span className="sidebar__onlineCardsHeader">People Online</span>
          <OnlineCard />
        </div>
        <hr className="sidebarHr" />
        <ul className="sidebar__FooterLinks">
          <li>
            <Link to="/about" className="sidebar__footerLink">
              About
            </Link>
          </li>
          <li>
            <Link className="sidebar__footerLink" to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="sidebar__footerLink" to="#">
              Report a Problem
            </Link>
          </li>
        </ul>

        <p> &copy; 2021</p>
      </div>
    </div>
  );
}
