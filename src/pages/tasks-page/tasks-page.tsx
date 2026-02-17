import React from "react";
import { useSelector } from "react-redux";
import { workspacePageSelector } from "../workspace-page/state/workspace-slice";
import TaskCard from "./components/task-card/task-card";
import css from "./tasks-page.module.css";
import EmptyCard from "./components/empty-card/empty-card";

const TasksPage = () => {
  const { todos: tasks } = useSelector(workspacePageSelector);

  return (
    <div className={css.contentArea}>
      <h1 className={css.headerTitle}>Все задачи</h1>
      {tasks.length ? (
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <TaskCard {...task} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default TasksPage;
