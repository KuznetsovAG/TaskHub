import { create } from "zustand";
import type { FormValues } from "../utils/types";

interface AuthProfile {
  userProfile: FormValues;
  addUser: (user: FormValues) => void;
}

export const useAuthProfile = create<AuthProfile>((set) => ({
  userProfile: {} as FormValues,
  addUser: (userProfile: FormValues) => set({ userProfile }),
}));
