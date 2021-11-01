// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import "./ProfileBanner.css";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../store/actions/followActions";

export default function ProfileBanner({ user }) {
  const [profilePic, setProfilePic] = useState();
  const [followed, setFollowed] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const history = useHistory();
  const dispatch = useDispatch();

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

  useEffect(() => {
    setFollowed(currentUser?.following.find((userId) => userId === user._id));
  }, [currentUser, user]);

  const handleClick = () => {
    history.push(`/profile/${user._id}`);
  };

  const handleFollow = () => {
    if (followed) dispatch(unFollowUser(user._id, currentUser._id));
    else dispatch(followUser(user._id, currentUser._id));

    setFollowed(!followed);
  };

  return (
    <div className="profileBanner">
      <div className="profileBanner__info" onClick={handleClick}>
        <Avatar alt="" src={profilePic} />
        <span>{user.username}</span>
      </div>
      <Button
        variant={followed ? "contained" : "outlined"}
        className="profileBanner__btn"
        disableElevation
        onClick={handleFollow}
      >
        {!followed ? "Follow" : "Following"}
      </Button>
    </div>
  );
}
