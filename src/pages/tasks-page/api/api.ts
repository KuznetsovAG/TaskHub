import axios, { AxiosError } from "axios";
import type { ApiError, Tasks } from "./dto";

// Утилитарная функция для создания стандартной ошибки API
const createApiError = ({
  message,
  statusCode,
  details,
}: Partial<ApiError>): ApiError => ({
  message,
  statusCode,
  details,
});

export const fetchGetTasks = async (): Promise<Tasks[] | never> => {
  try {
    const response = await axios.get<Tasks[]>(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );

    // Проверяем наличие массива данных
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid data structure");
    }

    return response.data;
  } catch (error: unknown) {
    let apiError: ApiError;

    if (axios.isAxiosError(error)) {
      // Если это ошибка от Axios, вытанем статус-код и сообщение
      apiError = createApiError({
        message: (error as Error).message,
        statusCode: (error as AxiosError).response?.status,
      });
    } else {
      // Любая другая неожиданная ошибка
      apiError = createApiError({
        message: (error as Error).message,
      });
    }

    throw apiError; // Просто перебрасываем сформированную ошибку дальше
  }
};
