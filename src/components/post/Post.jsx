import "./post.css";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LinkIcon from "@mui/icons-material/Link";

// firebase imports
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

import { useEffect, useState } from "react";
import axios from "../../axios";
import { format } from "timeago.js";
import { Link, useHistory } from "react-router-dom";
import DefaultProfilePic from "../../assets/profile.png";
import LikeIcon from "../../assets/like.png";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Alert,
  Card,
  CardHeader,
  CardActions,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Button,
  Collapse,
  Snackbar,
} from "@mui/material";
import { useSelector } from "react-redux";
import CommentSection from "../CommentSection/CommentSection";
import AlertDialog from "../AlertDialogue";

export default function Post({ post, showComments = false }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [postDeleted, setPostDeleted] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(showComments);
  const currentUser = useSelector((state) => state.auth.user);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [shareMenuAnchorEl, setShareMenuAnchorEl] = useState(null);
  const shareMenuOpen = Boolean(shareMenuAnchorEl);

  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  const [postImg, setPostImg] = useState();
  const [noOfComments, setNoOfComments] = useState(0);

  // post deleted alert
  const [alertOpen, setAlertOpen] = useState(false);

  const postLink = `${window.location.host}/posts/${post._id}`;

  // copy post link to clipboard
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // comments
  useEffect(() => {
    const getComments = async () => {
      await axios
        .get(`/comments/${post._id}/all`)
        .then((res) => {
          setNoOfComments(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getComments();
  }, [post._id]);

  // likes
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?._id));
    if (post.img) {
      getPostImage(post.img);
    }
  }, [currentUser._id, post.likes, post.img]);

  // getting profile pic from firebase storage
  useEffect(() => {
    const getImages = async (user) => {
      if (user._id === currentUser._id) {
        setProfilePic(currentUser.profilePicture);
      } else {
        await getDownloadURL(
          ref(storage, `${user.email}/profile/${user.profilePicture}`)
        )
          .then((url) => setProfilePic(url))
          .catch((e) => console.log(e));
      }
    };

    const fetchUser = async () => {
      await axios
        .get(`/users?userId=${post.userId}`)
        .then((res) => {
          setUser(res.data);
          getImages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchUser();
  }, [post.userId, currentUser]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser?._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // post menu
  const openPostMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePostMenu = () => {
    setAnchorEl(null);
  };

  const closeShareMenu = () => setShareMenuAnchorEl(null);

  // post menu actions
  const deletePost = async () => {
    setAnchorEl(null);
    setPostDeleted(true);
    try {
      await axios.delete("/posts/" + post._id);
      if (post.img) {
        // Create a reference to the file to delete
        const desertRef = ref(storage, post.img);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  // getting post image
  const getPostImage = async (filename) => {
    await getDownloadURL(ref(storage, filename))
      .then((url) => {
        setPostImg(url);
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const copyLinkBtn = (
    <MenuItem
      onClick={() => {
        navigator.clipboard.writeText(postLink);
        closePostMenu();
        closeShareMenu();
        handleSnackbarOpen();
      }}
    >
      <ListItemIcon>
        <LinkIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Copy link</ListItemText>
    </MenuItem>
  );

  const postMenu = (
    <Menu anchorEl={anchorEl} keepMounted open={open} onClose={closePostMenu}>
      <MenuList className="post__menuList" dense>
        <MenuItem>
          <ListItemIcon>
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Save</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAlertOpen(true)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

        {copyLinkBtn}
      </MenuList>
    </Menu>
  );

  // share menu
  const shareMenu = (
    <Menu
      anchorEl={shareMenuAnchorEl}
      keepMounted
      open={shareMenuOpen}
      onClose={closeShareMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <MenuList className="post__menuList" dense>
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Write post</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share now</ListItemText>
        </MenuItem>

        {copyLinkBtn}
      </MenuList>
    </Menu>
  );

  return (
    <>
      {postDeleted ? (
        <Alert
          style={{ marginBottom: "10px", marginTop: "10px" }}
          severity="warning"
        >
          You deleted this post
        </Alert>
      ) : (
        <>
          <Card className="post" sx={{ boxShadow: 2 }}>
            <CardHeader
              avatar={
                <Link to={`/profile/${user?._id}`}>
                  <Avatar src={profilePic} />
                </Link>
              }
              action={
                currentUser._id === user._id ? (
                  <>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={openPostMenu}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    {postMenu}
                  </>
                ) : (
                  ""
                )
              }
              title={user?.username}
              subheader={format(post.createdAt)}
            />
            <CardActionArea onClick={() => history.push("/posts/" + post._id)}>
              {post.desc ? (
                <CardContent>
                  <Typography variant="body2" color="text.primary">
                    {post.desc}
                  </Typography>
                </CardContent>
              ) : null}
              {postImg ? (
                <CardMedia
                  component="img"
                  className="postImg"
                  image={postImg}
                />
              ) : null}
            </CardActionArea>
            <CardContent className="postBottom">
              <div className="postBottomLeft">
                <img className="likeIcon" src={LikeIcon} alt="" />
                <span className="postLikeCounter">{like} people liked it</span>
              </div>
              <div
                onClick={() => setCommentsOpen(!commentsOpen)}
                className="postBottomRight"
              >
                <span className="postCommentText">{noOfComments} comments</span>
              </div>
            </CardContent>
            <CardActions className="postActions">
              <Button
                variant="text"
                startIcon={
                  isLiked ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />
                }
                fullWidth
                onClick={likeHandler}
                color={isLiked ? "primary" : "inherit"}
              >
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="text"
                startIcon={<ChatBubbleOutlineIcon />}
                color="inherit"
                fullWidth
                onClick={() => {
                  setCommentsOpen(!commentsOpen);
                }}
              >
                Comment
              </Button>

              <Button
                variant="text"
                startIcon={<ShareIcon />}
                color="inherit"
                fullWidth
                onClick={(e) => setShareMenuAnchorEl(e.currentTarget)}
              >
                Share
              </Button>
              {shareMenu}
            </CardActions>
            <Collapse in={commentsOpen} timeout="auto" unmountOnExit>
              <CommentSection postId={post._id} />
            </Collapse>
          </Card>
        </>
      )}
      <AlertDialog
        open={alertOpen}
        setOpen={setAlertOpen}
        handleConfirm={() => {
          setAlertOpen(false);
          deletePost();
        }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Link Copied
        </Alert>
      </Snackbar>
    </>
  );
}
