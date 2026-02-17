import type { RootState } from "../../../store/store";
import type { FormValues } from "../utils/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {} as FormValues,
};

export const {
  actions: { addUser },
  reducer: authReducer,
} = createSlice({
  initialState,
  name: "auth",
  reducers: {
    addUser(state, { payload }: PayloadAction<FormValues>) {
      state.userProfile = payload;
    },
  },
});

export const authSelector = (state: RootState) => state.auth;
