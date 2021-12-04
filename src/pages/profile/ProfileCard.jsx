import React, { useState, useEffect, memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { useHistory } from "react-router";
import axios from "../../axios";
import useProfilePic from "../../helpers/useProfilePicture";

function ProfileCard({ userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  const history = useHistory();
  const handleClick = () => {
    history.push(`/profile/${user._id}`);
  };

  const profilePic = useProfilePic(user);

  return (
    <Card sx={{ width: 150 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" height="110" image={profilePic} />
        <CardContent>
          <h2>{user.username}</h2>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default memo(ProfileCard);
