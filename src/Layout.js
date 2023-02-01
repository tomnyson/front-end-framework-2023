import { Container } from "react-bootstrap";
import Header from "./components/Header";
const Layout = (props) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};
export default Layout;
