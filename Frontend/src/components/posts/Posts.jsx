import { useEffect, useState } from "react";
import Post from "../post/Post";
import axios from "axios";
import "./posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts/timeline/all");
      setPosts(res.data)
    };
    fetchPosts();
  }, []);
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
