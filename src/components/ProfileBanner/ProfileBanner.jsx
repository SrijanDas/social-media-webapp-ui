// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

import React, { useState, useEffect, memo } from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import "./ProfileBanner.css";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../store/actions/followActions";
import axios from "../../axios";

const ProfileBanner = ({ user = { username: "john" }, userId }) => {
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`/users?userId=${userId}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (userId) getUser();
  }, [userId]);

  const [profilePic, setProfilePic] = useState();
  const [followed, setFollowed] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getImages = async () => {
      await getDownloadURL(
        ref(storage, `${profile?.email}/profile/${profile?.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    getImages();
  }, [profile]);

  useEffect(() => {
    setFollowed(
      currentUser?.following.find((userId) => userId === profile?._id)
    );
  }, [currentUser, profile]);

  const handleClick = () => {
    history.push(`/profile/${profile?._id}`);
  };

  const handleFollow = () => {
    if (followed) dispatch(unFollowUser(profile?._id, currentUser._id));
    else dispatch(followUser(profile?._id, currentUser._id));

    setFollowed(!followed);
  };

  return (
    <div className="profileBanner">
      <div className="profileBanner__info" onClick={handleClick}>
        <Avatar alt="" src={profilePic} />
        <span>{profile.username}</span>
      </div>
      {profile?._id !== currentUser._id && (
        <Button
          variant={followed ? "contained" : "outlined"}
          className="profileBanner__btn"
          disableElevation
          onClick={handleFollow}
        >
          {!followed ? "Connect" : "Connected"}
        </Button>
      )}
    </div>
  );
};

export default memo(ProfileBanner);
