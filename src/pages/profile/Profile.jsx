import "./profile.css";
// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

import Feed from "../../components/Feed/Feed";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router";

import DefaultProfilePic from "../../assets/profile.png";
import DefaultCoverPic from "../../assets/cover.jpg";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useSelector } from "react-redux";
import Follow from "../../components/Follow/Follow";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ProfileCard from "./ProfileCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  const userId = useParams().userId;
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  const coverPic = DefaultCoverPic;

  useEffect(() => {
    const getImages = async (givenUser) => {
      await getDownloadURL(
        ref(storage, `${givenUser.email}/profile/${givenUser.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };

    if (user?._id !== currentUser._id) {
      if (user?.profilePicture) getImages(user);
      else setProfilePic(DefaultProfilePic);
    } else {
      setProfilePic(currentUser.profilePicture);
      return;
    }
  }, [user, currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="profile">
      <div className="profileRightTop">
        <div className="profileCover">
          <img className="profileCoverImg" src={coverPic} alt="" />
          <img className="profileUserImg" src={profilePic} alt="" />
        </div>
        <div className="profileInfo">
          <h4 className="profileInfoName">{user?.username}</h4>
          <span className="profileInfoDesc">{user?.desc}</span>

          {currentUser._id === userId ? (
            <EditProfile />
          ) : (
            <Follow user={user} />
          )}
        </div>
        {user?.connections.length && (
          <div style={{ margin: "0.8rem 0" }}>
            <Divider />
            <div className="profile__connectionsContainer">
              <Typography variant="h6">Connections</Typography>
              <Typography variant="subtitle1">
                {user?.connections.length} connections
              </Typography>
              <div className="profile__connections">
                {user?.connections.map((connection) => (
                  <ProfileCard key={connection} userId={connection} />
                ))}
              </div>
            </div>
            <Divider />
          </div>
        )}
      </div>

      <Feed userId={userId} />
    </div>
  );
}
