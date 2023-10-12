import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NotFoundPage = ({ isLogin }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("login")}>
            Back {isLogin ? "Main" : "Login"}
          </Button>
        }
      />
    </div>
  );
};

NotFoundPage.propTypes = {
  isLogin: PropTypes.bool,
};

export default NotFoundPage;
