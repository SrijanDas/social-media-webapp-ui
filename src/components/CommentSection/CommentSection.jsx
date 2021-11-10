import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";
import axios from "../../axios";
import { useSelector } from "react-redux";

export default function CommentSection({ postId }) {
  const [commentList, setCommentList] = useState([]);
  const rootComments = commentList.filter(
    (comment) => comment.parentId === null
  );
  const [activeComment, setActiveComment] = useState(null);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getComments = async () => {
      await axios
        .get(`/comments/${postId}/all`)
        .then((res) => {
          setCommentList(
            res.data.sort((c1, c2) => {
              return new Date(c2.createdAt) - new Date(c1.createdAt);
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getComments();
  }, [postId]);

  const getReplies = (commentId) =>
    commentList
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = async (text, parentId) => {
    const newComment = {
      userId: currentUser._id,
      comment: text,
      postId: postId,
      parentId: parentId,
    };
    try {
      const res = await axios.post("/comments/new", newComment);
      setCommentList([res.data, ...commentList]);
      setActiveComment(null);
    } catch (error) {
      console.log(error);
    }
  };

  const updateComment = async (text, commentId) => {
    try {
      const res = await axios.put(`/comments/${commentId}`, { comment: text });
      if (res.status === 200) {
        setCommentList(
          commentList.map((comment) => {
            if (comment._id === commentId) {
              return res.data;
            }
            return comment;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    setActiveComment(null);
  };

  const deleteComment = async (commentId) => {
    await axios
      .delete(`/comments/${commentId}`)
      .then((res) => {
        if (res.status === 200) {
          setCommentList(commentList.filter((c) => c._id !== commentId));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Divider />
      <CommentForm
        handleSubmit={(text) => addComment(text, null)}
        buttonLabel="Comment"
      />
      {rootComments.map((rootComment) => (
        <Comment
          key={rootComment._id}
          comment={rootComment}
          replies={getReplies(rootComment._id)}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          addComment={addComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
      ))}
      {/* {!formClosed && (
        <CommentForm
          addComment={addComment}
          buttonLabel="Update"
          hasCancelBtn
          setFormClosed={setFormClosed}
        />
      )} */}
    </div>
  );
}
