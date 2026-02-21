import type { Priority } from "../../workspace-page/utils/types";

export interface FormValues {
  taskValue: string;
  descriptionValue: string;
  priority: Priority | string;
  category: string;
  projectName: string;
  startDate: string;
  dueDate: string;
}
