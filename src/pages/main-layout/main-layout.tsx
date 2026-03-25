// components/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard-page/components/sidebar/sidebar";
import css from "./main-layout.module.css";

const MainLayout = () => {
  return (
    <div className={css.wrapper}>
      <Sidebar />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
