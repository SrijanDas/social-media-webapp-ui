import "./Navbar.css";
import { Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { ref, getDownloadURL } from "firebase/storage";
import DefaultProfilePic from "../../assets/profile.png";
import { storage } from "../../config/firebaseConfig";
import { useHistory } from "react-router-dom";

// mui 5
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReorderIcon from "@mui/icons-material/Reorder";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  const [active, setActive] = useState("feed");

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
            <Search className="searchIcon" />
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
          <NavItem
            icon={<RssFeedIcon />}
            text="Feed"
            active={active}
            setActive={setActive}
          />
          <NavItem
            icon={<PeopleAltIcon />}
            text="People"
            active={active}
            setActive={setActive}
          />
          <NavItem
            icon={<ChatIcon />}
            text="Chat"
            active={active}
            setActive={setActive}
          />
          <NavItem
            icon={<NotificationsIcon />}
            text="Notifications"
            active={active}
            setActive={setActive}
          />
          <NavItem
            icon={<ReorderIcon />}
            text="More"
            active={active}
            setActive={setActive}
          />
        </div>
      </div>
    </div>
  );
}

const NavItem = ({
  icon = <RssFeedIcon />,
  text = "navlink",
  active,
  setActive,
}) => {
  const history = useHistory();

  // const changeRoute = (url) => {
  //   console.log(url);
  //   (url);
  // };

  return (
    <div
      onClick={() => {
        history.push(text.toLowerCase());
        setActive(text.toLowerCase());
      }}
      className={`nav__item${active === text.toLowerCase() ? "Active" : ""}`}
    >
      <div className="nav__iconWrapper">
        {icon}
        {/* <span className="nav__iconBadge">1</span> */}
      </div>
      <span className="nav__itemText">{text}</span>
    </div>
  );
};
