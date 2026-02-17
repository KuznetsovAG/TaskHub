import * as React from "react";

import css from "./task-card.module.css";
import type { Priority, Todo } from "../../../workspace-page/utils/types";
import { getPriorityIcon } from "../../utils/functions";

const TaskCard = ({
  taskValue,
  category,
  descriptionValue,
  dueDate,
  priority,
  projectName,
}: Todo) => {
  const priorityClassMap: Record<Priority, string> = {
    high: css.priorityHigh,
    medium: css.priorityMedium,
    low: css.priorityLow,
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

      <div className={css.taskMetaInfo}>
        <div className={css.metaItem}>
          <span className={css.metaIcon}>📂</span>
          <span className={css.metaLabel}>Категория:</span>
          <span className={css.metaValue}>{category}</span>
        </div>
        <div className={css.metaItem}>
          <span className={css.metaIcon}>{getPriorityIcon(priority)}</span>
          <span className={css.metaLabel}>Приоритет:</span>
          <span className={css.metaValue}>{priority}</span>
        </div>
        <div className={css.metaItem}>
          <span className={css.metaIcon}>📅</span>
          <span className={css.metaLabel}>Дедлайн:</span>
          <span className={css.metaValue}>{dueDate}</span>
        </div>
        <div className={css.taskMeta}>
          <span className={`${css.tag} ${css.tagwork}`}>{projectName}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
