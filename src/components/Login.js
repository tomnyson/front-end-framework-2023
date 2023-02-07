import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ navigation }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  // validate form
  const onSubmit = async (data) => {
    const { username, password } = data;
    console.log("click here to submit");
    const response = await axios.get(
      process.env.REACT_APP_API +
        `/users?username=${username}&password=${password}`
    );
    if (response.status === 200 && response.data.length > 0) {
      // TODO: login success
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      navigate("/home");
    } else {
      alert("tài khoản or mật khẩu không đúng");
    }
    console.log(response.data);
  };
  return (
    <Col md={{ span: 6, offset: 3 }}>
      <h3>Login</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            {...register("username", { required: true })}
            placeholder="Enter name"
          />
          {errors?.username?.type === "required" && (
            <p className="text-danger">This field is required</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            {...register("password", { required: true })}
            placeholder="password"
            rows={3}
          />
          {errors?.password?.type === "required" && (
            <p className="text-danger">This field is required</p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Col>
  );
};

export default Login;
