import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import ReorderIcon from "@material-ui/icons/Reorder";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbar">
      <div>
        <div className="topbarFirstRow">
          <div className="logo_container">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <span className="logo">Socials</span>
            </Link>
          </div>
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>

          <div className="profile">
            <Link to={`/profile/${user.username}`}>
              <Avatar
                alt={user.username[0]}
                src={
                  user.profilePicture
                    ? PF + "person/" + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
              />
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="topbarSecondRow">
          <div className="topbarIconItem">
            <Link to="/" style={{ textDecoration: "none", color: "#1877f2" }}>
              <RssFeedIcon />
            </Link>
          </div>
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "#1877f2" }}
            >
              <Chat />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link
              to="/options"
              style={{ textDecoration: "none", color: "#1877f2" }}
            >
              <ReorderIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
