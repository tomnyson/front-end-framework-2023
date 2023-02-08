import { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context";
const Header = ({ auth }) => {
  const navigate = useNavigate();
  const themValue = useContext(ThemeContext);
  console.log("themValue", themValue);
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
      <div className="header">
        <Link style={{ marginRight: 5 }} to="/">
          Home
        </Link>

        <Link to="/about" style={{ marginRight: 5 }}>
          About
        </Link>
        <Link to="/login" style={{ marginRight: 5 }}>
          Login
        </Link>
      </div>
      {auth && renderLogout()}
    </Nav>
  );
};

export default Header;
