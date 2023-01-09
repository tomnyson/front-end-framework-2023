import { useEffect, useState } from "react";
import axios from "axios";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    console.log("call api here");
    console.log(posts);
    if (posts.length === 0) {
      fetchPost();
    }
  }, [keyword]);

  const fetchPost = async () => {
    try {
      console.log("fetchPost");
      const response = await axios.get(
        "https://61a5e3c48395690017be8ed2.mockapi.io/blogs/article?keyword&page=1"
      );
      if (response.status === 200) {
        setPosts(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (posts.length === 0) {
    return <div className="loader"></div>;
  }
  return (
    <div className="posts">
      {posts.map((post) => {
        return (
          <div key={post.id} className="post">
            <img
              src={post.picture || "https://via.placeholder.com/150"}
              alt=""
            />
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>{post.name}</p>
            <p>{post.description}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Posts;
