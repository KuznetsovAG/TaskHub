import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import type { Todo } from "../utils/types";

interface InitialStateProps {
  todos: Todo[];
  currentPage: string;
}

const initialState: InitialStateProps = {
  todos: [],
  currentPage: "createTask",
};

export const {
  actions: { addTodo, setCurrentPage },
  reducer: workspaceReducer,
} = createSlice({
  initialState,
  name: "workspace-page",
  reducers: {
    addTodo(state, { payload }: PayloadAction<Todo>) {
      state.todos.push(payload);
    },
    setCurrentPage(state, { payload }: PayloadAction<string>) {
      state.currentPage = payload;
    },
  },
});

export const workspacePageSelector = (state: RootState) => state.workspace;
