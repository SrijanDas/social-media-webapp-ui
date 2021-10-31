// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import "./ProfileBanner.css";
import { useHistory } from "react-router";

export default function ProfileBanner({ user }) {
  const [profilePic, setProfilePic] = useState();
  const [followed, setFollowed] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getImages = async () => {
      await getDownloadURL(
        ref(storage, `${user.email}/profile/${user.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    getImages();
  }, [user]);

  const handleClick = () => {
    history.push(`/profile/${user._id}`);
  };

  return (
    <div className="profileBanner" onClick={handleClick}>
      <div className="profileBanner__info">
        <Avatar alt="" src={profilePic} />
        <span>{user.username}</span>
      </div>
      <Button
        variant={!followed ? "contained" : "outlined"}
        className="profileBanner__btn"
        disableElevation
        onClick={() => setFollowed(!followed)}
      >
        {!followed ? "Follow" : "Unfollow"}
      </Button>
    </div>
  );
}
