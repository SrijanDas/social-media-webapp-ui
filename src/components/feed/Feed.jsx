import { useEffect, useState } from "react";
import Share from "../Share/Share";
import "./feed.css";
import axios from "../../axios";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Alert from "@mui/material/Alert";

export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setloadingError] = useState(false);

  useEffect(() => {
    // console.log(res.data);
    const fetchPosts = async () => {
      try {
        const res = userId
          ? await axios.get(`posts/profile/${userId}`)
          : await axios.get(`posts/timeline/${currentUser?._id}`);

        setPosts(
          res.data.sort((p1, p2) => {
            setIsLoading(false);
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setloadingError(true);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [userId, currentUser]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!userId || userId === currentUser?._id) && <Share />}

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
            No new posts to show.
          </Alert>
        )}
      </div>
    </div>
  );
}
