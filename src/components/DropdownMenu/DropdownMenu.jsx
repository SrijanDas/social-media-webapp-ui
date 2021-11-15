import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useDispatch, useSelector } from "react-redux";
import { logoutCall } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import Feedback from "../FeedbackForm/FeedbackForm";

export default function DropdownMenu({ anchorEl, open, handleClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // feedback form dialog
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const handleFeedbackDialogOpen = () => {
    setFeedbackDialogOpen(true);
  };
  const handleFeedbackDialogClose = () => {
    setFeedbackDialogOpen(false);
  };

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
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
              width: 32,
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
        <MenuItem component={Link} to={`/profile/${user._id}`}>
          <Avatar src={user.profilePicture} alt="" />
          <ListItemText primary={user.username} secondary="View your profile" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleFeedbackDialogOpen}>
          <ListItemIcon>
            <FeedbackIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary="Feedback"
            secondary="Help us make your expirience better"
          />
        </MenuItem>
        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
          Help & Support
        </MenuItem>
        <MenuItem onClick={() => dispatch(logoutCall())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Feedback
        open={feedbackDialogOpen}
        handleClose={handleFeedbackDialogClose}
      />
    </div>
  );
}
