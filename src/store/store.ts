import { configureStore } from "@reduxjs/toolkit";
import { workspaceReducer } from "../pages/workspace-page/state/workspace-slice";
import { authReducer } from "../pages/auth-page/state/auth-slice";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
