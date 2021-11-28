// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

import React, { useState, useEffect, memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { useHistory } from "react-router";
import DefaultProfilePic from "../../assets/profile.png";
import axios from "../../axios";

function ProfileCard({ userId }) {
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);

  const getImages = async (givenUser) => {
    if (givenUser.profilePicture) {
      await getDownloadURL(
        ref(storage, `${givenUser.email}/profile/${givenUser.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    } else {
      setProfilePic(DefaultProfilePic);
      return;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUser(res.data);
      getImages(res.data);
    };
    fetchUser();
  }, [userId]);

  const history = useHistory();
  const handleClick = () => {
    history.push(`/profile/${user._id}`);
  };

  return (
    <Card sx={{ width: 150 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" height="110" image={profilePic} />
        <CardContent>
          <h2 className="">{user.username}</h2>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default memo(ProfileCard);
