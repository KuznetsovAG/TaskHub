import type { Priority } from "../../dashboard-page/utils/types";

export interface FormValues {
  taskValue: string;
  descriptionValue: string;
  priority: Priority | string;
  category: string;
  taskType: string;
  startDate: string;
  dueDate: string;
}
