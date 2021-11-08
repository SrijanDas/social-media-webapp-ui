import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./Comment.css";
import axios from "../../axios";

// firebase imports
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

export default function Comment({ comment }) {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    // getting profile pic from firebase storage
    const getImages = async (user) => {
      await getDownloadURL(
        ref(storage, `${user.email}/profile/${user.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };

    const fetchUser = async () => {
      await axios
        .get(`/users?userId=${comment.userId}`)
        .then((res) => {
          setUser(res.data);
          getImages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchUser();
  }, [comment]);

  return (
    <div className="comment">
      <Avatar src={profilePic} />
      <div className="comment__textContainer">
        <span className="comment__username">{user?.username}</span>
        <div className="comment__text">{comment.comment}</div>
      </div>
    </div>
  );
}
