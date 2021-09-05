import React, { useRef, useState } from "react";
import PublishIcon from "@material-ui/icons/Publish";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
export default function UpdateProfilePic({
  hasClicked,
  setProfilePic,
  setHasClicked,
}) {
  const [open, setOpen] = useState(hasClicked);
  const inputFile = useRef(null);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
    setHasClicked(false);
  };

  const handleSubmit = () => {
    console.log("Submit");
  };
  return (
    <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
      <List>
        <ListItem
          button
          onClick={() => {
            inputFile.current.click();
          }}
        >
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText primary="Upload Photo" />
        </ListItem>
        <form onSubmit={handleSubmit}>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept=".png, .jpeg, .jpg"
            ref={inputFile}
            onChange={(e) => {
              setProfilePic(e.target.files[0]);
            }}
          />
        </form>

        <ListItem button>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="View Photo" />
        </ListItem>
      </List>
    </Drawer>
  );
}
