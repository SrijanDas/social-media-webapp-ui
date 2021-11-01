import "./share.css";

// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { PermMedia, Cancel } from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Avatar from "@material-ui/core/Avatar";
import DefaultProfilePic from "../../assets/profile.png";
import { useSelector } from "react-redux";

export default function Share() {
  const user = useSelector((state) => state.auth.user);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);

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

  // creating new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="share">
        <div className="shareTop">
          <Link to={`/profile/${user._id}`}>
            <Avatar className="shareProfileImg" alt="..." src={profilePic} />
          </Link>
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
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

              <button className="shareButton" type="submit">
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
