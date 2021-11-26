// icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./Follow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  sendConnectionRequest,
  disconnectUser,
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../store/actions/followActions";

export default function Follow({ user }) {
  const [followed, setFollowed] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestReceived, setRequestReceived] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleFollow = () => {
    if (followed) {
      dispatch(disconnectUser(user?._id, currentUser._id));
      setFollowed(!followed);
    } else {
      dispatch(sendConnectionRequest(user?._id, currentUser._id));
      setRequestSent(true);
    }
  };

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

  return (
    <div className="follow">
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
