// icon
import CancelIcon from "@mui/icons-material/Cancel";

import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import "./UploadPhotoModal.css";
import Loader from "../Loader/Loader";
import { uploadProfilePhoto } from "../../helpers/imageHandler";
import { useSelector } from "react-redux";
import axios from "../../axios";

export default function UploadPhotoModal({ open, setOpen }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const timer = useRef();

  const handleClose = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setFile(null);
      setUploadedPhoto(false);
    }
  };

  const handleProfilePhotoChange = async () => {
    if (file) {
      const fileName = Date.now() + "_" + file.name;

      setIsUploading(true);
      const success = uploadProfilePhoto(user.email, file, fileName);

      // updating profile photo path in db
      if (success) {
        try {
          const body = {
            userId: user._id,
            profilePicture: fileName,
          };
          const res = await axios.put("/users/" + user._id, body);
          if (res.status === 200) {
            //   setting states to success
            timer.current = window.setTimeout(() => {
              setUploadedPhoto(true);
              setIsUploading(false);
            }, 2000);
          } else {
            setUploadedPhoto(false);
            setIsUploading(false);
          }
        } catch (error) {
          setUploadedPhoto(false);
          setIsUploading(false);
        }
      } else {
        setUploadedPhoto(false);
        setIsUploading(false);
      }
    } else console.log("no file selected");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        {uploadedPhoto ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Profile photo updated
          </Alert>
        ) : isUploading ? (
          <>
            <Loader />
            <h4>Uploading...</h4>
          </>
        ) : file ? (
          <div className="uploadDp__imgContainer">
            <IconButton
              className="uploadDp__cancelBtn"
              onClick={() => setFile(null)}
            >
              <CancelIcon fontSize="large" />
            </IconButton>
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          </div>
        ) : (
          <input
            type="file"
            id="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        {uploadedPhoto ? (
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Done
          </Button>
        ) : (
          <>
            <Button onClick={handleClose}>Close</Button>
            <Button
              disabled={!file}
              onClick={handleProfilePhotoChange}
              autoFocus
            >
              Upload Photo
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
