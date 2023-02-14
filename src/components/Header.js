import { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, Button, Row } from "react-bootstrap";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context";
const Header = ({ auth }) => {
  const navigate = useNavigate();
  const themValue = useContext(ThemeContext);
  const renderLogout = () => {
    return (
      <div>
        <Button
          style={{ color: themValue.theme.color }}
          variant="link"
          onClick={logout}
        >
          Hi: {auth.username} (logout)
        </Button>
      </div>
    );
  };
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Nav className="navigation" activeKey="/home">
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <Link style={{ marginRight: 5 }} to="/">
            Home
          </Link>

          <Link to="/about" style={{ marginRight: 5 }}>
            About
          </Link>
        </div>
        <div>
          <Link to="/login" style={{ marginRight: 5 }}>
            Login
          </Link>
          <Link to="/register" style={{ marginRight: 5 }}>
            Register
          </Link>
          <Link to="/cart" style={{ marginRight: 5 }}>
            cart
          </Link>
          {auth && renderLogout()}
        </div>
      </div>
    </Nav>
  );
};

export default Header;
