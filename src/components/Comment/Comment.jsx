// icons
import ReplyIcon from "@mui/icons-material/Reply";
import LikeIcon from "../../assets/like.png";

// firebase imports
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";

import "./Comment.css";
import axios from "../../axios";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import CommentForm from "../CommentForm/CommentForm";
import AlertDialog from "../AlertDialog";
import LikesDialog from "../LikesDialog/LikesDialog";

export default function Comment({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
}) {
  const currentUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(
    comment.userId === currentUser._id ? currentUser.profilePicture : null
  );

  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";

  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";
  const replyId = parentId ? parentId : comment._id;
  const isEdited = comment.createdAt !== comment.updatedAt;
  const [showReplies, setShowReplies] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);

  // likes dialog
  const [likesDialogOpen, setLikesDialogOpen] = useState(false);
  const handleLikesDialogOpen = () => {
    setLikesDialogOpen(true);
  };
  const handleLikesDialogClose = () => {
    setLikesDialogOpen(false);
  };

  // getting profile pic from firebase storage
  useEffect(() => {
    const getImages = async (user) => {
      await getDownloadURL(
        ref(storage, `${user.email}/profile/${user.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };

    const fetchUser = async () => {
      if (comment.userId === currentUser._id) {
        setUser(currentUser);
      } else {
        await axios
          .get(`/users?userId=${comment.userId}`)
          .then((res) => {
            setUser(res.data);
            getImages(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    fetchUser();
  }, [comment, currentUser]);

  // comment time formatter
  const formatDateTime = (dateTime) => {
    const time = format(dateTime).split(" ")[0];
    if (time === "just") return format(dateTime);
    else {
      const suffix = format(dateTime).split(" ")[1][0];
      return time + suffix;
    }
  };

  // likes
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  useEffect(() => {
    setIsLiked(likes.includes(currentUser._id));
  }, [currentUser, likes]);

  const handleLike = async () => {
    try {
      const res = await axios.put(`/comments/${comment._id}/like`, {
        userId: currentUser._id,
      });
      if (res.status === 200) {
        if (!isLiked) {
          setLikes([...likes, currentUser._id]);
          setIsLiked(true);
        } else {
          setLikes(likes.filter((id) => id !== currentUser._id));
          setIsLiked(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const handleDeleteConfirm = () => {
    deleteComment(comment._id);
  };

  return (
    <>
      <div className="comment">
        <Avatar src={profilePic} sx={{ width: 32, height: 32 }} />
        <div>
          {!isEditing && (
            <div className="comment__textContainer">
              <span className="comment__username">{user?.username}</span>
              <div className="comment__text">{comment.comment}</div>
            </div>
          )}

          {isEditing && (
            <CommentForm
              buttonLabel="Update"
              hasCancelBtn
              initialText={comment.comment}
              handleSubmit={(text) => updateComment(text, comment._id)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )}
          {!isEditing && (
            <div className="comment__actions">
              <Button
                variant="text"
                size="small"
                color={isLiked ? "primary" : "inherit"}
                onClick={handleLike}
              >
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  setActiveComment({ id: comment._id, type: "replying" });
                  setShowReplies(true);
                }}
              >
                Reply
              </Button>

              {comment.userId === currentUser._id ? (
                <>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() =>
                      setActiveComment({ id: comment._id, type: "editing" })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setAlertOpen(true)}
                  >
                    Delete
                  </Button>
                </>
              ) : null}

              <div className="comment__info">
                <Typography variant="caption">
                  {formatDateTime(comment.createdAt)}
                </Typography>
                {isEdited && (
                  <Typography variant="caption" className="comment__dateEdit">
                    &#9679; Edited {formatDateTime(comment.updatedAt)}
                  </Typography>
                )}
                {likes.length > 0 && (
                  <div
                    onClick={handleLikesDialogOpen}
                    className="comment__likes"
                  >
                    <img className="comment__likeIcon" src={LikeIcon} alt="" />
                    <Typography variant="caption" className="comment__dateEdit">
                      {likes.length}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* replies */}

          {replies.length > 0 && (
            <div className="comment__replies">
              <Button
                endIcon={<ReplyIcon />}
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? "Hide replies" : "View replies"}
                {` (${replies.length})`}
              </Button>
              <Collapse in={showReplies} timeout="auto" unmountOnExit>
                {replies.map((reply) => (
                  <Comment
                    comment={reply}
                    key={reply._id}
                    setActiveComment={setActiveComment}
                    activeComment={activeComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                    addComment={addComment}
                    parentId={comment._id}
                    replies={[]}
                  />
                ))}
              </Collapse>
            </div>
          )}
          {isReplying && (
            <CommentForm
              buttonLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
              hasCancelBtn
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )}
        </div>
      </div>

      <AlertDialog
        open={alertOpen}
        setOpen={setAlertOpen}
        handleConfirm={handleDeleteConfirm}
      />
      {/* likes dialog */}
      <LikesDialog
        open={likesDialogOpen}
        handleClose={handleLikesDialogClose}
        likes={likes}
      />
    </>
  );
}
