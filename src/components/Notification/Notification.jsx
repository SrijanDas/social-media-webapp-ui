import React from "react";
import "./Notification.css";
import Avatar from "@mui/material/Avatar";

export default function Notification() {
  return (
    <div className="nf">
      <Avatar />
      <span>
        <strong>John Doe </strong>
        liked your post
      </span>
    </div>
  );
}
