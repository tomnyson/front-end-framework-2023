import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import { ThemeContext } from "./context";
const Layout = (props) => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  return (
    <ThemeContext.Provider
      value={{
        theme: {
          color: "green",
        },
      }}
    >
      <Container>
        <Header auth={currentUser} />
        {props.children}
      </Container>
    </ThemeContext.Provider>
  );
};
export default Layout;
