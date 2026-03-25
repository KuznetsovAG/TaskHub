import { type Todo } from "../../dashboard-page/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialStateProps {
  tasks: Todo[];
  addTask: (task: Todo) => void;
  removeTask: (id: number) => void;
}

export const useCreateTask = create<InitialStateProps>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task: Todo) =>
        set((state) => ({
          tasks: [task, ...state.tasks],
        })),
      removeTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "tasks-storage",
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    }
  )
);
