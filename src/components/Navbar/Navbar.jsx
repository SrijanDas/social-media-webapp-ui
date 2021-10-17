import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import DefaultProfilePic from "../../assets/profile.png";

// firebase
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

// mui 5
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReorderIcon from "@mui/icons-material/Reorder";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);

  useEffect(() => {
    const getImages = async () => {
      await getDownloadURL(
        ref(storage, `${user.username}/profile/${user.username}.jpg`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    getImages();
  }, [user]);

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
            <SearchIcon className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>

          <div className="profile">
            <Link to={`/profile/${user.username}`}>
              <Avatar alt={user.username} src={profilePic} />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="topbarSecondRow">
          <NavItem icon={<RssFeedIcon />} text="Feed" route="/" />
          <NavItem icon={<PeopleAltIcon />} text="People" route="/people" />
          <NavItem icon={<ChatIcon />} text="Chat" route="/chat" />
          <NavItem
            icon={<NotificationsIcon />}
            text="Notifications"
            route="/notifications"
          />
          <NavItem icon={<ReorderIcon />} text="More" route="/more" />
        </div>
      </div>
    </div>
  );
}

const NavItem = ({ icon = <RssFeedIcon />, text = "navlink", route = "/" }) => {
  return (
    <Link to={route} className="nav__item">
      <div className="nav__iconWrapper">
        {icon}
        {/* <span className="nav__iconBadge">1</span> */}
      </div>
      <span className="nav__itemText">{text}</span>
    </Link>
  );
};
