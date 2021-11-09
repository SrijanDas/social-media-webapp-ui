import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import "./NotificationDropdown.css";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification";

export default function NotificationDropdown({
  open,
  nfAnchorEl,
  handleClose,
}) {
  return (
    <Menu
      anchorEl={nfAnchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 36,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <div className="nfDropdown__header">
        <h2>Notifications</h2>
        <Link className="nfDropdown__headerLink" to="/notifications">
          Show all
        </Link>
      </div>
      <Divider />

      <MenuItem>
        <Notification />
      </MenuItem>
      <MenuItem>
        <Notification />
      </MenuItem>
      <MenuItem>
        <Notification />
      </MenuItem>
      <MenuItem>
        <Notification />
      </MenuItem>

      <Divider />
      <div className="nf__bottom">
        <span>Mark all as read</span>
      </div>
    </Menu>
  );
}
