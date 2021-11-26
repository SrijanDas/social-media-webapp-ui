// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

// icons
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import React, { useState, useEffect, memo } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import "./ProfileBanner.css";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  sendConnectionRequest,
  disconnectUser,
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../store/actions/followActions";

const ProfileBanner = ({ user }) => {
  const [profilePic, setProfilePic] = useState();
  const [followed, setFollowed] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestReceived, setRequestReceived] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getImages = async () => {
      await getDownloadURL(
        ref(storage, `${user?.email}/profile/${user?.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    getImages();
  }, [user]);

  useEffect(() => {
    setFollowed(
      currentUser?.connections.find((userId) => userId === user?._id)
    );
    setRequestSent(
      user?.connectRequests.find((userId) => userId === currentUser._id)
    );
    setRequestReceived(
      currentUser.connectRequests.find((userId) => userId === user?._id)
    );
  }, [currentUser, user]);

  const handleClick = () => {
    history.push(`/profile/${user?._id}`);
  };

  const handleFollow = () => {
    if (followed) {
      dispatch(disconnectUser(user?._id, currentUser._id));
      setFollowed(!followed);
    } else {
      dispatch(sendConnectionRequest(user?._id, currentUser._id));
      setRequestSent(true);
    }
  };

  return (
    <div className="profileBanner">
      <div className="profileBanner__info" onClick={handleClick}>
        <Avatar alt="" src={profilePic} />
        <span>{user?.username}</span>
      </div>
      {user?._id !== currentUser._id && (
        <div className="profileBanner__btnContainer">
          {requestSent && (
            <Button
              variant="contained"
              disableElevation
              startIcon={<PersonAddAlt1RoundedIcon />}
              // onClick={() => setRequestSent(!requestSent)}
            >
              Requsted
            </Button>
          )}

          {requestReceived && (
            <>
              <Button
                variant="contained"
                disableElevation
                onClick={() =>
                  dispatch(acceptConnectionRequest(user?._id, currentUser._id))
                }
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                disableElevation
                onClick={() =>
                  dispatch(rejectConnectionRequest(user?._id, currentUser._id))
                }
              >
                Decline
              </Button>
            </>
          )}

          {!requestSent && !requestReceived && (
            <Button
              variant={!followed ? "contained" : "outlined"}
              className="profileBanner__btn"
              disableElevation
              onClick={handleFollow}
              startIcon={!followed ? <AddIcon /> : <PersonRemoveIcon />}
            >
              {!followed ? "Connect" : "Diconnect"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(ProfileBanner);
