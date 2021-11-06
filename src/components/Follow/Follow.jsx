// icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./Follow.css";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../store/actions/followActions";

export default function Follow({ user }) {
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    setFollowed(currentUser?.following.find((userId) => userId === user._id));
  }, [currentUser, user]);

  const handleFollow = () => {
    if (followed) dispatch(unFollowUser(user._id, currentUser._id));
    else dispatch(followUser(user._id, currentUser._id));

    setFollowed(!followed);
  };
  return (
    <div className="follow">
      <Button
        variant={!followed ? "contained" : "outlined"}
        className="profileBanner__btn"
        disableElevation
        onClick={handleFollow}
        startIcon={!followed && <AddIcon />}
      >
        {!followed ? "Follow" : "Unfollow"}
      </Button>
      <Button
        startIcon={<MailOutlineIcon />}
        className="profileBanner__msgBtn"
        variant="contained"
        disableElevation
      >
        Message
      </Button>
    </div>
  );
}
