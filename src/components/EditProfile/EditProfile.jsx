// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

// icons
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

// mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";

import React, { useState, forwardRef, useEffect } from "react";
import "./EditProfile.css";
import { useSelector } from "react-redux";
import DefaultProfilePic from "../../assets/profile.png";
import UploadPhotoModal from "../UploadPhotoModal/UploadPhotoModal";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfile() {
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState(user.username);
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);

  // editing booleans
  const [editUsername, setEditUsername] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(false);

  // modal
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getImages = async () => {
      await getDownloadURL(
        ref(storage, `${user.email}/profile/${user.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    if (user.profilePicture) getImages();
    else {
      setProfilePic(DefaultProfilePic);
      return;
    }
  }, [user]);

  const changeUsername = () => {
    setEditUsername(false);
    console.log("Changing username to...", username);
  };

  return (
    <div className="profileTools">
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
      >
        Edit Profile
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="editProfile__formContainer">
          <div className="editProfile__profileImgContainer">
            <Avatar
              alt="Remy Sharp"
              src={profilePic}
              sx={{ width: 128, height: 128 }}
            />
            <Button
              onClick={() => setEditProfilePic(true)}
              startIcon={<CameraAltIcon />}
              variant="contained"
            >
              Change Photo
            </Button>
            <UploadPhotoModal
              open={editProfilePic}
              setOpen={setEditProfilePic}
            />
          </div>
          <div className="editProfile__inputContainer">
            <TextField
              disabled={!editUsername}
              label="Username"
              variant="standard"
              value={username}
              id="username-input"
              onChange={(e) => setUsername(e.target.value)}
            />
            {editUsername ? (
              <IconButton onClick={changeUsername}>
                <CheckIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setEditUsername(true)}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          <div className="editProfile__inputContainer">
            <TextField
              disabled
              label="Email"
              variant="standard"
              value={user.email}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
