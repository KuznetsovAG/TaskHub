import * as React from "react";
import css from "./workspace-page.module.css";
import CreateTask from "../create-task/create-task";

const WorkspacePage = () => {
  return (
    <div className={css.wrapper}>
      <CreateTask />
    </div>
  );
};

export default WorkspacePage;
