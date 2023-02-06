import React, { useState, useEffect, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import avatar from "./images/avatar.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ProfileFunc from "./components/ProfileFunc";
import Posts from "./Posts";
import Form from "react-bootstrap/Form";
import { callAPI } from "./services/api.js";
import { paginate } from "./utils/helper";
import CreatePost from "./components/CreatePost";
import Nav from "react-bootstrap/Nav";

import {
  Container,
  Button,
  Row,
  InputGroup,
  Pagination,
} from "react-bootstrap";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

/**
 *  căn chính gữa
 * border màu xanh 2px
 *  nền gray
 *
 */
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      ten: "Lê Hồng Sơn",
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleOnChangeInput = (event) => {
    console.log(event.target.value);
    this.setState({ ten: event.target.value });
  };
  render() {
    const { nganh, email } = this.props;
    return (
      <div>
        <p className="red">Ngành: {nganh}</p>
        <input
          type="tex"
          onChange={this.handleOnChangeInput}
          placeholder="nhập tên"
        />
        <p className="red">Tên: {this.state.ten}</p>
        <p>
          email:
          <FontAwesomeIcon icon={faEnvelope} />
          {email}
        </p>
      </div>
    );
  }
}

function App() {
  const [nganhName, setNganhName] = useState("UDPM");
  const limit = 8;
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(null);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log("call comp");
    return () => {
      console.log("destroy comp");
    };
  }, [nganhName]);

  // const fetchAPI = useCallback(async () => {
  //   console.log("fetching api from server");
  //   const data = await callAPI(`/blogs/article?search=${keyword}`, "GET");
  //   console.log("data", data);
  // }, [keyword]);

  const handleOnChangeInput = (event) => {
    setTimeout(() => {
      setKeyword(event.target.value);
    }, [3000]);
  };

  useEffect(() => {
    fetchBlog();
  }, [keyword]);

  const fetchBlog = async () => {
    let url = "/posts?_sort=createdAt&_order=desc";
    if (keyword) {
      url = `/posts?q=${keyword}`;
    }
    const data = await callAPI(url, "GET");
    setData(data);
  };
  if (data.length > 0) {
    console.log(paginate(data, limit, 5));
  }

  let items = [];
  for (let number = 1; number <= Math.ceil(data.length / limit); number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          setPage(number);
        }}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handleReload = ({ type, item }) => {
    console.log("item", item);
    switch (type) {
      case "create":
        const newData = [...data];
        setData([item, ...newData]);
        break;
      case "update":
        break;
      case "delete":
        break;
      default:
        new Error("not found type");
    }
    // console.log("id removed", id);
    // const updatePost = data.filter((post) => post.id !== id);
    // setData(updatePost);
  };

  return (
    <Container>
      {/* <div className="wrapper_inner">
        <img src={avatar} alt="avatar" width={150} height={150} />
        <br />
        <input
          type="tex"
          onKeyPress={handleOnPress}
          // onChange={handleOnChangeInput}
          id="txtNganh"
          placeholder="nhập tên ngành"
        />
        <button onClick={handleChange} type="button">
          change
        </button> */}
      {/* <Profile
          nganh={nganhName}
          ten="Lê Hồng Sơn"
          email="tabletkindfire@gmail.com"
        />
        <ProfileFunc
          nganh={nganhName}
          ten="Lê Hồng Sơn"
          email="tabletkindfire@gmail.com"
        /> */}
      {/* </div> */}
      <Row>
        <div>
          <InputGroup style={{ width: "50%" }} className="mb-2 mt-2">
            <Form.Control
              onChange={handleOnChangeInput}
              type="text"
              placeholder="what are you looking for?"
            />
            <Button>search</Button>
          </InputGroup>
          <Button onClick={() => setIsOpen(!isOpen)} variant="primary">
            create post
          </Button>
        </div>
        <Posts
          keyword={keyword}
          onReload={handleReload}
          posts={paginate(data, limit, page)}
        />
        <Pagination>{items}</Pagination>
      </Row>
      <CreatePost
        onReload={handleReload}
        isShow={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </Container>
  );
}

export default App;
