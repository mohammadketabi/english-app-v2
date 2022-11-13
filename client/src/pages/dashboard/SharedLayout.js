import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
          <footer className="copyright-shared">
            © 2022 Develope by
            <a
              className="mohammad-shared"
              href="https://mohammadketabi.com"
              target="_blank"
            >
              Mohammad Ketabi
            </a>
          </footer>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
