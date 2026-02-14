import type { Priority } from "../../workspace-page/utils/types";

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
