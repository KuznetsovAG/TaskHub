import * as React from "react";
import css from "./dashboard-page.module.css";
import CreateTask from "../create-task/create-task";

const DashboardPage = () => {
  return (
    <div className={css.wrapper}>
      <CreateTask />
    </div>
  );
};

export default DashboardPage;
