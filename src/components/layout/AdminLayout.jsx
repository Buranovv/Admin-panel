import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Layout, Menu, Button, theme, Modal } from "antd";
import "./adminLayout.css";
import { TOKEN } from "../../const";
const { Header, Sider, Content } = Layout;

const AdminLayout = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    Modal.confirm({
      title: "Do you want to exit",
      onOk: () => {
        navigate("/login");
        setIsLogin(false);
        localStorage.removeItem(TOKEN);
      },
    });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="aside-logo">{collapsed ? "LMS" : "LMS admin"}</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/teachers",
              icon: <TeamOutlined />,
              label: <Link to="/teachers">Teachers</Link>,
            },
            {
              key: "/students",
              icon: <TeamOutlined />,
              label: <Link to="/students">Students</Link>,
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: logout,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="layout-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

AdminLayout.propTypes = {
  setIsLogin: PropTypes.func,
};

export default AdminLayout;
