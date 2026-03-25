import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormValues } from "../utils/types";

interface User extends FormValues {
  id: string;
  registeredAt: number;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  register: (userData: FormValues) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const isEmailTaken = (users: User[], email: string): boolean => {
  return users.some((user) => user.email === email);
};

export const useAuthProfile = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isLoading: false,
      error: null,

      register: async (userData: FormValues) => {
        set({ isLoading: true, error: null });

        try {
          // Имитация API-запроса
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Проверяем, не занят ли email
          const { users } = get();
          if (isEmailTaken(users, userData.email)) {
            throw new Error("Пользователь с таким email уже существует");
          }

          // Проверяем совпадение паролей
          if (userData.password !== userData.confirmPassword) {
            throw new Error("Пароли не совпадают");
          }

          // Создаём нового пользователя
          const newUser: User = {
            ...userData,
            id: crypto.randomUUID(),
            registeredAt: Date.now(),
          };

          set((state) => ({
            users: [...state.users, newUser],
            currentUser: newUser,
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Ошибка регистрации",
            isLoading: false,
          });
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          const { users } = get();
          const user = users.find((u) => u.email === email);

          if (!user) {
            throw new Error("Пользователь не найден");
          }

          if (user.password !== password) {
            throw new Error("Неверный пароль");
          }

          set({
            currentUser: user,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Ошибка входа",
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({ currentUser: null });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
      }),
    }
  )
);
