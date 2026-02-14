import * as React from "react";
import { useSelector } from "react-redux";
import { workspacePageSelector } from "../workspace-page/state/workspace-slice";
import TaskCard from "./components/task-card/task-card";
import css from "./tasks-page.module.css";
import { Button } from "../../components";

const TasksPage = () => {
  const { todos: tasks } = useSelector(workspacePageSelector);

  return (
    <div className={css.contentArea}>
      <h1 className={css.headerTitle}>Все задачи</h1>
      {tasks.length ? (
        tasks.map((task) => (
          <div key={task.id}>
            <TaskCard {...task} />
          </div>
        ))
      ) : (
        <div className={css.container}>
          <div className={css.illustration}>
            <div className={`${css.circle} ${css.circle1}`}></div>
            <div className={`${css.circle} ${css.circle2}`}></div>
            <div className={css.checkmark}>✓</div>
          </div>
          <h2 className={css.title}>Задач пока нет</h2>
          <p className={css.subtitle}>
            Создайте свою первую задачу, чтобы начать управлять своим временем
            эффективно.
          </p>

          <div className={css.actions}>
            <Button title="Создать первую задачу" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
