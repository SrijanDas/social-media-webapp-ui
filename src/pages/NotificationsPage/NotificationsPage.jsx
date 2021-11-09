import React from "react";
import Notification from "../../components/Notification/Notification";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Notifications() {
  return (
    <div className="pageContainer">
      <div className="page">
        <Sidebar />
        <div className="pageContent">
          <h1>Notifications</h1>
          <Notification />
          <Notification />
          <Notification />
        </div>
        <Rightbar />
      </div>
    </div>
  );
}
