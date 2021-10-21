import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Notifications() {
  return (
    <div className="pageContainer">
      <div className="page">
        <Sidebar className="sidebar" />
        <div className="pageContent">
          <h1>Notifications</h1>
        </div>
      </div>
    </div>
  );
}
