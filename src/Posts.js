import { useCallback, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { BsArchive } from "react-icons/bs";
import { callAPI } from "./services/api";
import { Link } from "react-router-dom";
import { ACTION } from "./const";
import { CartContext } from "./context";
const Posts = ({ posts, keyword, onReload }) => {
  const testData = useCallback(() => {
    console.log("Posts here", keyword);
  }, [keyword]);

  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(CartContext);

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
          <Col
            xs={12}
            md={3}
            key={post.id}
            style={{ marginBottom: 10 }}
            className="post"
          >
            <img src={post.image || "https://via.placeholder.com/150"} alt="" />
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
              <Button
                onClick={() => {
                  dispatch({
                    type: ACTION.ADD_ITEM,
                    payload: {
                      item: { ...post, quantity: 1 },
                    },
                  });
                }}
                style={{ width: 100 }}
              >
                BUY
              </Button>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
export default Posts;
