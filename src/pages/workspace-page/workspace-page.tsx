import * as React from "react";
import Sidebar from "./components/sidebar/sidebar";
import css from "./workspace-page.module.css";
import CreateTask from "../create-task/create-task";
import TasksPage from "../tasks-page/tasks-page";
import { useSelector } from "react-redux";
import { workspacePageSelector } from "./state/workspace-slice";

const WorkspacePage = () => {
  const { currentPage } = useSelector(workspacePageSelector);
  return (
    <div className={css.wrapper}>
      <Sidebar />
      {currentPage === "createTask" ? <CreateTask /> : <TasksPage />}
    </div>
  );
};

export default WorkspacePage;
