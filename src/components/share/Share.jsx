import "./share.css";

// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

import { PermMedia, Cancel } from "@material-ui/icons";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Card from "@mui/material/Card";
import { useSelector } from "react-redux";
import useProfilePic from "../../helpers/useProfilePicture";

export default function Share() {
  const user = useSelector((state) => state.auth.user);
  const profilePic = useProfilePic(user);
  const [postCaption, setPostCaption] = useState("");
  const [file, setFile] = useState(null);
  const [postUploaded, setPostUploaded] = useState(false);
  const timer = useRef();

  // creating new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);

    const newPost = {
      userId: user._id,
      desc: postCaption,
    };

    // uploading files to firebase
    if (file) {
      const fileName = Date.now() + "_" + file.name;
      newPost.img = `${user.email}/uploads/${fileName}`;
      try {
        const storageRef = ref(storage, `${user.email}/uploads/${fileName}`);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then(async (snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      } catch (error) {
        console.log(error);
      }
    }

    // finally saving new post to db
    try {
      await axios.post("/posts", newPost);
      timer.current = window.setTimeout(
        () => {
          setPostUploaded(true);
        },
        file ? 3000 : 200
      );
    } catch (error) {
      console.log(error);
    }
  };

  // progress modal
  const [open, setOpen] = useState(false);

  const handleClose = (e, reason) => {
    if (reason !== "backdropClick") {
      window.location.reload();
      setOpen(false);
    }
  };

  return (
    <>
      <Card className="share" sx={{ boxShadow: 2 }}>
        <div className="shareTop">
          <Link to={`/profile/${user._id}`}>
            <Avatar className="shareProfileImg" src={profilePic} />
          </Link>
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            onChange={(e) => setPostCaption(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          {file && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Cancel
                className="shareCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </label>

              <button
                className="shareButton"
                type="submit"
                disabled={postCaption === "" && file === null ? true : false}
              >
                Share
              </button>
            </div>
          </form>
        </div>
      </Card>

      <Dialog open={open} fullWidth>
        <DialogTitle id="alert-dialog-title">
          {!postUploaded ? "Uploading post ..." : "Post uploaded"}
        </DialogTitle>
        <DialogContent>
          {!postUploaded ? (
            <DialogContentText id="alert-dialog-description">
              <LinearProgress />
            </DialogContentText>
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={!postUploaded} onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
