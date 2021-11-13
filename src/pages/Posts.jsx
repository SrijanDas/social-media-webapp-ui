import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Post from "../components/Post/Post";
import Loader from "../components/Loader/Loader";
import axios from "../axios";

export default function Posts() {
  const postId = useParams().postId;
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPost = async () => {
      await axios
        .get(`/posts/${postId}`)
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsLoading(false);
    };
    fetchPost();
  }, [postId]);

  return (
    <div style={{ marginTop: "1rem" }}>
      {isLoading ? (
        <Loader size={36} />
      ) : (
        <Post post={post} showComments disableActionArea />
      )}
    </div>
  );
}
