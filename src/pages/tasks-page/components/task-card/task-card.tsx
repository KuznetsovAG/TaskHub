import * as React from "react";

import css from "./task-card.module.css";
import type { Priority, Todo } from "../../../dashboard-page/utils/types";
import { useCreateTask } from "../../../create-task/state/create-task-state";

const TaskCard = ({
  taskValue,
  category,
  descriptionValue,
  dueDate,
  priority = "low",
  taskType,
  id,
}: Todo) => {
  const priorityClassMap: Record<Priority, string> = {
    high: css.priorityHigh,
    medium: css.priorityMedium,
    low: css.priorityLow,
  };

  const additionalInfo = Boolean(category || taskType || dueDate);

  const { removeTask } = useCreateTask();

  const handleDeleteTask = (id: number): void => {
    removeTask(id);
  };
  return (
    <div className={css.taskCard}>
      <div
        className={`${css.priorityIndicator} ${
          priorityClassMap[priority as keyof typeof priorityClassMap] ?? ""
        }`}
      />
      <div className={css.taskHeader}>
        <div className={css.taskCheckbox}></div>
        <div className={css.taskTitleWrapper}>
          <div className={css.taskTitle}>{taskValue}</div>
        </div>
      </div>

      <div className={css.taskDescription}>{descriptionValue}</div>

      {additionalInfo && (
        <div className={css.taskMetaInfo}>
          {category && (
            <div className={css.metaItem}>
              <span className={css.metaIcon}>📂</span>
              <span className={css.metaLabel}>Категория:</span>
              <span className={css.metaValue}>{category}</span>
            </div>
          )}
          {dueDate && (
            <div className={css.metaItem}>
              <span className={css.metaIcon}>📅</span>
              <span className={css.metaLabel}>Дедлайн:</span>
              <span className={css.metaValue}>{dueDate}</span>
            </div>
          )}
          {taskType && (
            <div className={css.metaItem}>
              <span className={css.metaIcon}>💻</span>
              <span className={css.metaLabel}>Тип задачи:</span>
              <span className={`${css.tag} ${css.tagwork}`}>{taskType}</span>
            </div>
          )}
        </div>
      )}
      <div className={css.buttonContainer}>
        <button
          type="button"
          className={css.deleteButton}
          onClick={() => handleDeleteTask(id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
