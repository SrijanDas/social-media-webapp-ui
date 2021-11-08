import React, { useState } from "react";
import "./CommentModal.css";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Comment from "../Comment/Comment";
import axios from "../../axios";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CommentModal({ open, setOpen, postId, comments }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(comments);
  const handleClose = () => {
    setOpen(false);
  };

  const currentUser = useSelector((state) => state.auth.user);

  const handleComment = async () => {
    setComment("");
    const newComment = {
      userId: currentUser._id,
      comment,
    };
    try {
      await axios.put(`posts/${postId}/comment`, newComment);
      setCommentList([...commentList, newComment]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      scroll="paper"
      fullWidth
    >
      <DialogTitle>{"Comments"}</DialogTitle>

      <DialogContent>
        {commentList.length ? (
          commentList.map((c, index) => <Comment key={index} comment={c} />)
        ) : (
          <p>No comments yet</p>
        )}
      </DialogContent>
      <Divider />
      <DialogActions className="comment__action">
        <TextField
          variant="outlined"
          label="Write a comment..."
          fullWidth
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="comment__btn"
          variant="contained"
          disableElevation
          disabled={comment.length === 0}
          onClick={handleComment}
        >
          Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
