export interface FormValues {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: FormValues | null;
  isLoading: boolean;
  register: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}
