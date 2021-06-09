import React, { useEffect, useState } from "react";
import "./Conversation.css";
import Avatar from "@material-ui/core/Avatar";
import axios from "../../axios";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (friendId) getUser();
  }, [currentUser?._id, conversation?.members]);

  return (
    <div className="conversation">
      <Avatar
        src={
          user?.profilePicture
            ? PF + "person/" + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        className="conversation__img"
      >
        JC
      </Avatar>

      <span className="conversation__name">{user?.username}</span>
    </div>
  );
}

export default Conversation;
