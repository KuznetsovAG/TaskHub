/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";

import css from "./filtered-task-card.module.css";
import TaskCard from "../tasks-page/components/task-card/task-card";
import EmptyCard from "../tasks-page/components/empty-card/empty-card";
import { useSelector } from "react-redux";
import { workspacePageSelector } from "../workspace-page/state/workspace-slice";
import { useParams } from "react-router-dom";
import { capitalize } from "../workspace-page/utils/functions";

const FilteredTaskCard = () => {
  const { todos: tasks } = useSelector(workspacePageSelector);
  const { filter } = useParams();
  const [filterTasks, setFiterTasks] = useState(tasks);

  useEffect(() => {
    if (filter) {
      const filterArr = tasks.filter(
        (task) => task.projectName === capitalize(filter)
      );

      setFiterTasks(filterArr);
    }
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
