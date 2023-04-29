import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "antd";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100vh;
  @media screen and (max-width: 1600px) {
    width: 50%;
  }
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
`;

const tabList = [
  {
    key: "login",
    tab: "Login",
  },
  {
    key: "register",
    tab: "Register",
  },
];

const contentList: Record<string, React.ReactNode> = {
  login: <Login />,
  register: <Register />,
};

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<string>("login");

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Wrapper>
      <CardWrapper>
        <Card style={{ width: "100%" }} tabList={tabList} activeTabKey={activeTab} onTabChange={onTabChange}>
          {contentList[activeTab]}
        </Card>
      </CardWrapper>
    </Wrapper>
  );
};
