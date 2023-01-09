import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import avatar from "./images/avatar.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ProfileFunc from "./components/ProfileFunc";
import Posts from "./Posts";
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

  useEffect(() => {
    console.log("call comp");
    return () => {
      console.log("destroy comp");
    };
  }, [nganhName]);

  const handleChange = (event) => {
    const data = document.getElementById("txtNganh").value;
    setNganhName(data);
  };

  const handleOnChangeInput = (event) => {
    console.log(event);
    setNganhName(event.target.value);
  };
  const handleOnPress = (event) => {
    /*
      charCode 13
      code"Enter"
      */
    if (event.charCode === 13) {
      const data = document.getElementById("txtNganh").value;
      setNganhName(data);
    }
  };
  return (
    <div className="wrapper">
      <div className="wrapper_inner">
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
        </button>
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
      </div>
      <Posts />
    </div>
  );
}

export default App;
