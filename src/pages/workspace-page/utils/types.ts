export type Priority = "high" | "medium" | "low";

export interface Todo {
  id: number;
  isCompleted: boolean;
  taskValue: string;
  descriptionValue: string;
  priority: Priority | string;
  category: string;
  projectName: string;
  startDate?: string;
  dueDate: string;
}

export enum Pages {
  CREATE_TASK = "createTask",
  TASKS = "tasks",
}
