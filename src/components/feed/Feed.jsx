import { useEffect, useState } from "react";
import Share from "../Share/Share";
import "./feed.css";
import axios from "../../axios";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Alert from "@mui/material/Alert";
import InfiniteScroll from "react-infinite-scroll-component";
import useIsMountedRef from "../../helpers/useIsMountedRef";

export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setloadingError] = useState(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const limit = 1;
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    // console.log(res.data);
    const fetchPosts = async () => {
      try {
        const res = userId
          ? await axios.get(`posts/profile/${userId}`)
          : await axios.get(`posts/timeline/${currentUser?._id}`);

        setPosts(
          res.data.results.sort((p1, p2) => {
            setIsLoading(false);
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        if (!res.data.next) setHasMore(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setloadingError(true);
        setIsLoading(false);
      }
    };
    if (isMountedRef.current) fetchPosts();
  }, [userId, currentUser, isMountedRef]);

  const fetchMorePosts = async () => {
    setPage(page + 1);
    try {
      const res = userId
        ? await axios.get(`posts/profile/${userId}?page=${page}&limit=${limit}`)
        : await axios.get(
            `posts/timeline/${currentUser?._id}?page=${page}&limit=${limit}`
          );

      const newPosts = res.data.results.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      setPosts([...posts, ...newPosts]);

      if (!res.data.next) setHasMore(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!userId || userId === currentUser?._id) && <Share />}

        {isLoading ? (
          <Loader size={40} />
        ) : posts.length ? (
          <>
            <InfiniteScroll
              dataLength={posts?.length}
              next={() => {
                window.setTimeout(() => {
                  fetchMorePosts();
                }, 500);
              }}
              hasMore={hasMore}
              loader={<Loader size={40} />}
            >
              {posts.map((p, index) => (
                <Post key={p._id + "-" + index} post={p} />
              ))}
            </InfiniteScroll>
          </>
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
