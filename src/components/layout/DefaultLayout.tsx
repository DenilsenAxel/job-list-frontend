import React from "react";

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthProvider";
import { Button, Typography } from "antd";

const Layout = styled.div`
  display: grid;
`;

const HeaderWrapper = styled.div`
  display: flex;
  background-color: #0fa2de;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  .title {
    color: #f5f8fa;
  }
`;

export const DefaultLayout = () => {
  const { Title } = Typography;
  const { onLogout } = React.useContext(AuthContext)!;

  return (
    <>
      <Layout>
        <HeaderWrapper>
          <Title level={2} className="title">
            Salaryman
          </Title>
          <Button onClick={onLogout!} danger type="primary" size="large">
            Logout
          </Button>
        </HeaderWrapper>
        <Outlet />
      </Layout>
    </>
  );
};
