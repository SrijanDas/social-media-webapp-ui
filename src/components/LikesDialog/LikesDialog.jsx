import React, { memo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Transition from "../Transition";
import ProfileBanner from "../ProfileBanner/ProfileBanner";

const LikesDialog = ({ open, handleClose, likes }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {`${likes.length} people liked it`}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      {likes.map((userId) => (
        <ProfileBanner key={userId} userId={userId} />
      ))}
    </Dialog>
  );
};

export default memo(LikesDialog);
