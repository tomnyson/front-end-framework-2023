import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
const Login = () => {
  return (
    <Col md={{ span: 6, offset: 3 }}>
      <h3>Login</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            //   onChange={OnchangeInput}
            name="username"
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            //   onChange={OnchangeInput}
            placeholder="password"
            rows={3}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Col>
  );
};

export default Login;
