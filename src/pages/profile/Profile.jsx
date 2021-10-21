import "./profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router";

import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import DefaultProfilePic from "../../assets/profile.png";
import DefaultCoverPic from "../../assets/cover.jpg";
import {
  ProfileToolsOthers,
  ProfileToolsUser,
} from "../../components/ProfileTools/ProfileTools";
import UpdateProfilePic from "../../components/UpdateProfilePic/UpdateProfilePic";
import { useSelector } from "react-redux";

export default function Profile() {
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.auth.user);
  const username = useParams().username;
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  const [hasClicked, setHasClicked] = useState(false);
  const coverPic = DefaultCoverPic;

  useEffect(() => {
    const getImages = async () => {
      await getDownloadURL(ref(storage, `${username}/profile/${username}.jpg`))
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    getImages();
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={coverPic} alt="" />
              <img
                onClick={() => {
                  setHasClicked(true);
                }}
                className="profileUserImg"
                src={profilePic}
                alt=""
              />
              {hasClicked ? (
                <UpdateProfilePic
                  setProfilePic={setProfilePic}
                  hasClicked={hasClicked}
                  setHasClicked={setHasClicked}
                />
              ) : (
                ""
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
              {currentUser.username === username ? (
                <ProfileToolsUser />
              ) : (
                <ProfileToolsOthers />
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            {/* <Rightbar user={user} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
