import { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import "./feed.css";
import axios from "../../axios";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`posts/profile/${username}`)
        : await axios.get(`posts/timeline/${currentUser._id}`);

      setPosts(res.data);
    };
    fetchPosts();
  }, [username, currentUser._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* {currentUser._id === username ? <Share /> : <> </>} */}
        {(!username || username === currentUser.username) && <Share />}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
