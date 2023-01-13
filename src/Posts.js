import { useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Posts = ({ posts, keyword }) => {
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
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>{post.name}</p>
            <p>{post.description}</p>
            <Button onClick={testData}>click here</Button>
          </Col>
        );
      })}
    </Row>
  );
};
export default Posts;
