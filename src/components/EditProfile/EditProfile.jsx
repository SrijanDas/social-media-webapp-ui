import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";

import EditIcon from "@mui/icons-material/Edit";
import React, { useState, forwardRef } from "react";
import "./EditProfile.css";
import { useSelector } from "react-redux";
import { getProfileImage } from "../../helpers/imageHandler";
import DefaultProfilePic from "../../assets/profile.png";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfile() {
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState(user.username);
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  const [file, setFile] = useState(null);

  // modal
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (user.profilePicture) {
    const url = getProfileImage(user.email, user.profilePicture);
    setProfilePic(url);
  }

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
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className="editProfile__formContainer">
          <div className="editProfile__profileImgContainer">
            <Avatar
              alt="Remy Sharp"
              src={profilePic}
              sx={{ width: 128, height: 128 }}
            />
            <label htmlFor="editProfileFile">
              <span> Change Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="editProfileFile"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setProfilePic(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
          <TextField
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            disabled
            label="Email"
            variant="standard"
            value={user.email}
          />
        </div>
      </Dialog>
    </div>
  );
}
