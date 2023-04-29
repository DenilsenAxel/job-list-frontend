import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
`;

export const DefaultLayout = () => {
  return (
    <>
      <Layout>
        test
        <Outlet />
      </Layout>
    </>
  );
};
