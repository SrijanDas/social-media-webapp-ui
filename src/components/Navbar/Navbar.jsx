import React, { useState } from "react";
import "./Navbar.css";
// icons
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PeopleIcon from "@mui/icons-material/People";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useSelector } from "react-redux";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [nfAnchorEl, setNfAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(nfAnchorEl);

  const [notificationCount, setNotificationCount] = useState(4);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNfAnchorEl(null);
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            className="navbar__logo"
            noWrap
            component={Link}
            to="/"
          >
            siu
          </Typography>
          <div className="navbar__searchContainer">
            <div className="navbar__searchForm">
              <SearchIcon color="primary" />
              <input
                className="navbar__searchInput"
                placeholder="search..."
                type="text"
              />
            </div>
            <IconButton
              className="navbar__searchIcon"
              size="large"
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size="large" color="inherit" component={Link} to="/">
              <RssFeedIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              component={Link}
              to="/people"
            >
              <PeopleIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              component={Link}
              to="/chats"
            >
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => {
                setNotificationCount(0);
                setNfAnchorEl(e.currentTarget);
              }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={user.profilePicture}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <DropdownMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
      <NotificationDropdown
        nfAnchorEl={nfAnchorEl}
        open={notificationOpen}
        handleClose={handleNotificationClose}
      />
    </div>
  );
}
