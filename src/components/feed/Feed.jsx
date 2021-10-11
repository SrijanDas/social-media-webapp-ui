import { useEffect, useState } from "react";
import Share from "../share/Share";
import "./feed.css";
import axios from "../../axios";
import Post from "../post/Post";
import { useSelector } from "react-redux";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`posts/profile/${username}`)
        : await axios.get(`posts/timeline/${currentUser?._id}`);
      try {
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [username, currentUser?._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === currentUser?.username) && <Share />}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
