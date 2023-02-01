import { useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { BsArchive } from "react-icons/bs";
import { callAPI } from "./services/api";
import { Link } from "react-router-dom";
const Posts = ({ posts, keyword, onReload }) => {
  const testData = useCallback(() => {
    console.log("Posts here", keyword);
  }, [keyword]);
  if (posts.length === 0) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <Row>
      {posts.map((post) => {
        return (
          <Col xs={12} md={3} key={post.id} className="post">
            <img
              src={post.picture || "https://via.placeholder.com/150"}
              alt=""
            />
            <div>
              <BsArchive
                onClick={async () => {
                  const response = await callAPI(
                    `/blogs/article/${post.id}`,
                    "DELETE"
                  );
                  console.log(response);
                  if (response) {
                    alert("delete successfully");
                    onReload(post.id);
                  }
                }}
                style={{ cursor: "pointer" }}
                color={"red"}
              />
              <p style={{ fontWeight: "bold", marginBottom: 5 }}>
                <Link to={`/post/${post.id}`}> {post.name}</Link>
              </p>
              <p>{post.description}</p>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
export default Posts;
