import React, { useMemo } from "react";

import css from "./filtered-task-card.module.css";
import TaskCard from "../tasks-page/components/task-card/task-card";
import EmptyCard from "../tasks-page/components/empty-card/empty-card";
import { useParams } from "react-router-dom";
import { capitalize } from "../workspace-page/utils/functions";
import { useCreateTask } from "../create-task/state/create-task-state";

const FilteredTaskCard = () => {
  const { tasks } = useCreateTask();

  const { filter } = useParams();
  const filterTasks = useMemo(() => {
    if (!filter) return tasks;
    return tasks.filter((task) => task.projectName === capitalize(filter));
  }, [filter, tasks]);

  const currentTask =
    filter === "работа задачи"
      ? "Рабочие"
      : filter === "личные задачи"
      ? "Личные"
      : "Цели";

  return (
    <div className={css.contentArea}>
      <h1 className={css.headerTitle}>{currentTask}</h1>
      {filterTasks.length ? (
        <div>
          {filterTasks.map((task) => (
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

export default FilteredTaskCard;
