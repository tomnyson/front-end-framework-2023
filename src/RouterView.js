import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import PostDetail from "./components/DetailPost";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
const RouteList = () => {
  let routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/", element: <h1>about</h1> },
    { path: "/post/:id", element: <PostDetail /> },
    { path: "/cart", element: <Cart /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return routes;
};

const RouterView = () => {
  return (
    <Router>
      <Layout>
        <RouteList />
      </Layout>
    </Router>
  );
};
export default RouterView;
