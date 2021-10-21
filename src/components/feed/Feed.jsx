import { useEffect, useState } from "react";
import Share from "../Share/Share";
import "./feed.css";
import axios from "../../axios";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Alert from "@mui/material/Alert";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setloadingError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`posts/profile/${username}`)
        : await axios.get(`posts/timeline/${currentUser?._id}`);
      try {
        if (res.data.length > 0) {
          setPosts(
            res.data.sort((p1, p2) => {
              setIsLoading(false);
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setloadingError(true);
      }
    };
    fetchPosts();
  }, [username, currentUser?._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === currentUser?.username) && <Share />}

        {isLoading ? (
          <Loader size={40} />
        ) : posts.length ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : loadingError ? (
          <Alert className="feed__msg" severity="error">
            Something went wrong!
          </Alert>
        ) : (
          <Alert className="feed__msg" severity="info">
            Follow some people to see their posts
          </Alert>
        )}
      </div>
    </div>
  );
}
