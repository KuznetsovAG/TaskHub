import React, { useEffect } from "react";
import TaskCard from "./components/task-card/task-card";
import css from "./tasks-page.module.css";
import EmptyCard from "./components/empty-card/empty-card";
import { useTasksQuery } from "./hooks";
import { useCreateTask } from "../create-task/state/create-task-state";

const TasksPage = () => {
  const { setTasks, tasks } = useCreateTask();
  const { data, isLoading } = useTasksQuery();

  useEffect(() => {
    if (tasks.length === 0 && data) {
      setTasks(data);
    }
  }, [data, setTasks, tasks.length]);

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
