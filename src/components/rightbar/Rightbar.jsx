import "./rightbar.css";
import { Avatar } from "@mui/material";
import ElonMuskImg from "../../assets/elon-musk.jpg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Rightbar() {
  return (
    <div className="rightbarWrapper">
      <div className="peopleList">
        <span className="peopleList__header">People you may know</span>
        <ProfileBanner />
        <ProfileBanner />
        <ProfileBanner />
        <ProfileBanner />
        <div className="peopleList__seeMore">
          <Link className="peopleList__seeMoreLink" to="/">
            See More
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProfileBanner() {
  return (
    <div className="profileBanner">
      <Avatar alt="..." src={ElonMuskImg} />
      <div className="profileBanner__text">
        <span>Elon Musk</span>
        <span className="profileBanner__username">@elon_musk</span>
      </div>
      <Button
        variant="contained"
        className="profileBanner__btn"
        disableElevation
      >
        Follow
      </Button>
    </div>
  );
}
