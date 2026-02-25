import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodo,
  workspacePageSelector,
} from "../workspace-page/state/workspace-slice";
import TaskCard from "./components/task-card/task-card";
import css from "./tasks-page.module.css";
import EmptyCard from "./components/empty-card/empty-card";
import { useTasksQuery } from "./hooks";

const TasksPage = () => {
  const { todos: tasks } = useSelector(workspacePageSelector);

  const dispatch = useDispatch();

  const { data, isLoading } = useTasksQuery();

  useEffect(() => {
    if (tasks.length === 0 && data) {
      dispatch(setTodo(data));
    }
  }, [data, dispatch, tasks.length]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

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
