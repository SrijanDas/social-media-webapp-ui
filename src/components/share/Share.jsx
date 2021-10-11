import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Avatar from "@material-ui/core/Avatar";
import { ref, getDownloadURL } from "firebase/storage";
import DefaultProfilePic from "../../assets/profile.png";
import { storage } from "../../config/firebaseConfig";

export default function Share() {
  const user = JSON.parse(localStorage.getItem("user"));
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);

  useEffect(() => {
    const getImages = async () => {
      await getDownloadURL(
        ref(storage, `${user.username}/profile/${user.username}.jpg`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    getImages();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    console.log(newPost);
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + "_" + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
        console.log(newPost);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareTop">
        <Link to={`/profile/${user.username}`}>
          <Avatar
            className="shareProfileImg"
            alt={user.username}
            src={profilePic}
          />
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
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
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
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
    // <div className="share">
    //   <div className="shareWrapper">
    //     <div className="shareTop">

    //
    //     </div>
    //
    //     <div className="formContainer">
    //
    //
    //     </div>
    //   </div>
    // </div>
  );
}
