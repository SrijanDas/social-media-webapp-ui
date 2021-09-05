import "./post.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DefaultProfilePic from "../../assets/profile.png";
import LikeIcon from "../../assets/like.png";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    // getting profile pic from firebase storage
    const getImages = async (user) => {
      await getDownloadURL(
        ref(storage, `${user.username}/profile/${user.username}.jpg`)
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
    try {
      await axios.delete("/posts/" + post._id);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user?.username}`}>
              <img className="postProfileImg" src={profilePic} alt="" />
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
                <MenuItem onClick={deletePost}>Delete</MenuItem>
              </Menu>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {post.img ? (
            <img className="postImg" src={PF + post.img} alt="" />
          ) : (
            ""
          )}
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
  );
}
