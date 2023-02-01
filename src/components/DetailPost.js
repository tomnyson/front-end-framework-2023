import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { callAPI } from "../services/api";
import { useParams } from "react-router-dom";
const PostDetail = (props) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    console.log("Fetching detail");
    const data = await callAPI(`/blogs/article/${id}`, "GET");
    if (data) {
      console.log(data);
      setPost(data);
      setLoading(false);
    }
  };

  if (loading) {
    <Row>
      <h1>loading</h1>
    </Row>;
  }
  if (post) {
    return (
      <Row>
        <Col xs={12} md={3} className="post">
          <img
            src={`${post.picture || "https://via.placeholder.com/150"} `}
            alt=""
          />
          <div>
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>{post.name}</p>
            <p>{post.description}</p>
          </div>
        </Col>
      </Row>
    );
  }
};
export default PostDetail;
