// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import {
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../store/actions/followActions";

function Request({ userId }) {
  const [profile, setProfile] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  const [profilePic, setProfilePic] = useState();
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

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

  const handleClick = () => {
    history.push(`/profile/${profile?._id}`);
  };

  const declineRequest = () => {
    dispatch(rejectConnectionRequest(profile?._id, currentUser?._id));

    setDeclined(true);
  };

  const acceptRequest = () => {
    dispatch(acceptConnectionRequest(profile?._id, currentUser?._id));
    setAccepted(true);
  };

  return (
    <div className="profileBanner">
      <div className="profileBanner__info" onClick={handleClick}>
        <Avatar alt="" src={profilePic} />
        <span>{profile?.username}</span>
      </div>
      {profile?._id !== currentUser._id && (
        <div className="profileBanner__btnContainer">
          {accepted && (
            <Button variant="contained" disableElevation onClick={handleClick}>
              Connected
            </Button>
          )}

          {declined && (
            <Button variant="contained" disableElevation disabled>
              Declined
            </Button>
          )}

          {!accepted && !declined && (
            <>
              <Button
                variant="contained"
                className="profileBanner__btn"
                disableElevation
                onClick={acceptRequest}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                disableElevation
                onClick={declineRequest}
              >
                Decline
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Request;
