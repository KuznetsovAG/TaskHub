import type { Priority } from "../../dashboard-page/utils/types";
import type { Tasks } from "../api/dto";

export const getPriorityIcon = (priority: Priority | string): string => {
  switch (priority) {
    case "high":
      return "🔴";
    case "medium":
      return "🟡";
    case "low":
      return "🟢";
    default:
      return "⚪";
  }
};

export const normalizeTasks = (data: Tasks[]) => {
  return data.map((item) => ({
    id: item.id,
    isCompleted: item.completed,
    taskValue: item.title,
  }));
};
