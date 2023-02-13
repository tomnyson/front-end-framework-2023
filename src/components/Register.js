import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    fullName: yup.string().required(),
    username: yup.string().required("tài khoản không được trống"),
    email: yup.string().email().required(),
    password: yup.string().min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")])
      .required("không khớp với mật khẩu"),
  })
  .required();

const Register = ({ navigation }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  // validate form
  const onSubmit = async (data) => {
    const { username, password, email } = data;
    console.log("click here to submit");
    /**
     * b1: check username
     */
    const checkUserName = await axios.get(
      process.env.REACT_APP_API + `/users?username=${username}`
    );

    const checkEmail = await axios.get(
      process.env.REACT_APP_API + `/users?=${email}`
    );

    if (
      (checkUserName.status === 200 && checkUserName.data.length) ||
      (checkEmail.status === 2000 && checkEmail.data.length)
    ) {
      alert("tài khoản || email đã tồn tại");
      return;
    }

    const response = await axios.post(process.env.REACT_APP_API + `/users`, {
      ...data,
      role: "user",
    });
    if (response.status === 201) {
      alert("đăng ký thành công");
      /**
       * TODO: send email
       */
      navigate("/login");
    }
  };
  return (
    <Col md={{ span: 6, offset: 3 }}>
      <h3>Register</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="fullName"
            type="text"
            {...register("fullName")}
            placeholder="Enter your name"
          />
          {errors?.fullName && (
            <p className="text-danger">{errors.fullName.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            {...register("username")}
            placeholder="Enter username"
          />
          {errors?.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            {...register("email")}
            placeholder="Enter email"
          />
          {errors?.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            {...register("password")}
            placeholder="password"
            rows={3}
          />
          {errors?.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password Confirm</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="password"
            rows={3}
          />
          {errors?.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Col>
  );
};

export default Register;
