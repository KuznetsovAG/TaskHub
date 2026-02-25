import { useQuery } from "@tanstack/react-query";
import { fetchGetTasks } from "../api/api";
import { normalizeTasks } from "../utils/functions";

export const useTasksQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchGetTasks,
    select(data) {
      return normalizeTasks(data);
    },
    staleTime: Infinity,
  });

  return {
    data,
    isLoading,
  };
};
