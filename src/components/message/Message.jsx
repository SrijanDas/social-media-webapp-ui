import Avatar from "@material-ui/core/Avatar";
import React from "react";
import "./Message.css";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="messageImg">
          <Avatar />
        </div>
        <div className="messageText">
          <p>{message.text}</p>
        </div>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
