import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actionTypes } from "../Redux/constants/actionTypes";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = ({ children }) => {
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const onLogOut = () => {
    dispatch({
      type: actionTypes.SAVE_USER,
      payload: null,
    });
    localStorage.removeItem("ACCESS_TOKEN");
  };

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[window.location.pathname.split("/")[1]]}
          mode="inline"
        >
          <Menu.Item
            key=""
            icon={<PieChartOutlined />}
            onClick={() => navigate("/")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="users"
            icon={<UserOutlined />}
            onClick={() => navigate("/users")}
          >
            Users
          </Menu.Item>
          <SubMenu key="/movie" icon={<DesktopOutlined />} title="Movie">
            <Menu.Item key="movie" onClick={() => navigate("/movie")}>
              Movies
            </Menu.Item>
            <Menu.Item key="5" onClick={() => navigate("/ticket")}>
              Tickets
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Cinema">
            <Menu.Item key="6" onClick={() => navigate("/cinema-system")}>
              Cinemas
            </Menu.Item>
            <Menu.Item key="8" onClick={() => navigate("/showtime")}>
              Showtime
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="d-flex flex-row-reverse text-white">
            <p
              className="mr-4"
              onClick={onLogOut}
              style={{ cursor: "pointer" }}
            >
              Log out
            </p>
            <p className="mr-4 cursor-pointer">{user.name}</p>
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
