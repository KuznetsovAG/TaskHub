import { type Todo } from "./../../workspace-page/utils/types";
import { create } from "zustand";

interface InitialStateProps {
  tasks: Todo[];
  addTask: (task: Todo) => void;
  setTasks: (tasks: Todo[]) => void;
}

export const useCreateTask = create<InitialStateProps>((set) => ({
  tasks: [],
  addTask: (task: Todo) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),
  setTasks: (tasks: Todo[]) => set({ tasks }),
}));
