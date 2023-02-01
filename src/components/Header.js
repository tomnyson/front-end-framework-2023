import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
const Header = () => {
  return (
    <Nav activeKey="/home">
      <Link style={{ marginRight: 5 }} to="/">
        Home
      </Link>

      <Link to="/about">About</Link>
    </Nav>
  );
};

export default Header;
