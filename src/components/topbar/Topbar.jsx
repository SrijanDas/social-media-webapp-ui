import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { logoutCall } from "../../apiCalls";
import Avatar from "@material-ui/core/Avatar";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import MoreIcon from "@material-ui/icons/More";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const logOut = (e) => {
    e.preventDefault();
    logoutCall(dispatch);
    localStorage.clear();
  };

  return (
    <div className="topbar">
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
      <hr style={{ border: "1px solid white" }} />
      <div className="topbarSecondRow">
        <div className="topbarIconItem">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <RssFeedIcon />
          </Link>
        </div>
        <div className="topbarIconItem">
          <Person />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <Chat />
          <span className="topbarIconBadge">2</span>
        </div>
        <div className="topbarIconItem">
          <Notifications />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <MoreIcon />
        </div>
      </div>
      {/* <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <span className="logo">Socials</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + "person/" + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <button onClick={logOut}>Logout</button>
      </div> */}
    </div>
  );
}
