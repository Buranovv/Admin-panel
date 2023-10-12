import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../const";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;

    if (username === "eve.holt@reqres.in" && password === "@dminm@n") {
      const login = async () => {
        try {
          let {
            data: { token },
          } = await axios.post("https://reqres.in/api/login", values);
          localStorage.setItem(TOKEN, token);
        } catch (err) {
          message.error(err);
        }
      };
      login();

      setIsLogin(true);
      navigate("/dashboard");
    } else {
      message.error("No user or password is wrong");
    }
  };

  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <Form
        name="login"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
          padding: "30px",
          border: "1px solid black",
          borderRadius: "10px",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username or Email"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 24,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

LoginPage.propTypes = {
  setIsLogin: PropTypes.func,
};

export default LoginPage;
