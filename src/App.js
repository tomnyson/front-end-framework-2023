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
import { Container, Button, Row, InputGroup } from "react-bootstrap";
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
  const [keyword, setKeyword] = useState(null);
  const [data, setData] = useState([]);

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
    setKeyword(event.target.value);
  };

  useEffect(() => {
    fetchBlog();
  }, [keyword]);

  const fetchBlog = async () => {
    const data = await callAPI(`/blogs/article?search=${keyword}`, "GET");
    setData(data);
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
        </div>
        <Posts keyword={keyword} posts={data} />
      </Row>
    </Container>
  );
}

export default App;
