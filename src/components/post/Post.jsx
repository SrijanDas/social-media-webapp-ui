import "./post.css";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
// firebase imports
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

import { useEffect, useState } from "react";
import axios from "../../axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import DefaultProfilePic from "../../assets/profile.png";
import LikeIcon from "../../assets/like.png";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [postDeleted, setPostDeleted] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  const [postImg, setPostImg] = useState();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?._id));
    if (post.img) {
      getPostImage(post.img);
    }
  }, [currentUser._id, post.likes, post.img]);

  useEffect(() => {
    // getting profile pic from firebase storage
    const getImages = async (user) => {
      await getDownloadURL(
        ref(storage, `${user.email}/profile/${user.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
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
  }, [post.userId]);

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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openPostMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePostMenu = (option) => {
    setAnchorEl(null);
    console.log(option);
  };

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

  return (
    <>
      {postDeleted ? (
        <Alert style={{ marginBottom: "10px" }} severity="warning">
          You deleted this post
        </Alert>
      ) : (
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user?._id}`}>
                  <Avatar className="postProfileImg" src={profilePic} />
                </Link>
                <span className="postUsername">{user?.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
              {currentUser._id === user._id ? (
                <div className="postTopRight">
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={openPostMenu}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={closePostMenu}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={deletePost}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="postCenter">
              {post.desc ? <span className="postText">{post.desc}</span> : null}
              {post.img ? (
                <img className="postImg" src={postImg} alt="" />
              ) : null}
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src={LikeIcon}
                  onClick={likeHandler}
                  alt=""
                />

                <span className="postLikeCounter">{like} people liked it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
