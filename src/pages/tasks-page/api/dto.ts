export interface Tasks {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ApiError {
  message?: string;
  statusCode?: number;
  details?: Record<string, unknown>; // Дополнительные метаданные об ошибке
}
