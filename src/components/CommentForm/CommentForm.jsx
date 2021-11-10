import { Button, InputBase, Avatar } from "@mui/material";
import React, { useState } from "react";
import "./CommentForm.css";
import { useSelector } from "react-redux";

export default function CommentForm({
  handleSubmit,
  buttonLabel = "Comment",
  hasCancelBtn = false,
  handleCancel,
  initialText = "",
}) {
  const [text, setText] = useState(initialText);
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div className="commentForm__container">
      {buttonLabel.toLowerCase() !== "update" && (
        <Avatar
          src={currentUser.profilePicture}
          sx={{ width: 32, height: 32 }}
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(text);
          setText("");
        }}
        className={hasCancelBtn ? "commentForm--hasCancelBtn" : "commentForm"}
      >
        <InputBase
          size="small"
          placeholder="Write a comment..."
          fullWidth
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="commentForm__input"
          autoFocus
        />

        <div>
          <Button
            className="commentForm__btn"
            variant="contained"
            disableElevation
            disabled={text.length === 0}
            type="submit"
            size="small"
          >
            {buttonLabel}
          </Button>
          {hasCancelBtn && (
            <Button
              className="commentForm__cancelBtn"
              size="small"
              onClick={handleCancel}
              color="inherit"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
