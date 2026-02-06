import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GetTasks, CreateTask, UpdateTask, DeleteTask } from "../services/task";
import {
  ICreateTask,
  IUpdateTask,
  ITask,
  IGetTasks,
  IPaginationInfo,
} from "../services/task/DTO";
import { useAuth } from "../context/user-provider";

export const useTasks = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<ITask.Model[]>([]);
  const [pagy, setPagy] = useState<IPaginationInfo.Info>({
    count: 0,
    page: 1,
    items: 10,
    pages: 1,
    last: 1,
    from: 0,
    to: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<IGetTasks.FilterParams>({
    page: 1,
    items: 10,
  });

  const fetchTasks = async (newFilters?: IGetTasks.FilterParams) => {
    if (!token) return;

    setIsLoading(true);
    const filtersToUse = newFilters || filters;
    
    const result = await GetTasks({ 
      token,
      filters: filtersToUse,
    });
    if (result.success && result.data) {
      setTasks(result.data.data);
      setPagy(result.data.pagy);
      setFilters(filtersToUse);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const setStatus = (status: "pending" | "approved" | "rejected" | undefined) => {
    fetchTasks({ ...filters, status, page: 1 });
  };

  const setExperienceRewardRange = (min?: number, max?: number) => {
    fetchTasks({ 
      ...filters, 
      experience_reward_min: min,
      experience_reward_max: max,
      page: 1,
    });
  };

  const setCharacterId = (characterId?: number) => {
    fetchTasks({ ...filters, character_id: characterId, page: 1 });
  };

  const setSortBy = (sortBy: "status" | "experience_reward" | "created_at" | "updated_at", direction: "asc" | "desc") => {
    fetchTasks({ ...filters, sort_by: sortBy, sort_direction: direction, page: 1 });
  };

  const goToPage = (page: number) => {
    fetchTasks({ ...filters, page });
  };

  const createTask = async (data: Omit<ICreateTask.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateTask({ ...data, token });
    if (result.success) {
      await fetchTasks(filters);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const updateTask = async (data: Omit<IUpdateTask.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdateTask({ ...data, token });
    if (result.success) {
      await fetchTasks(filters);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deleteTask = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await DeleteTask({ id, token });
    if (result.success) {
      await fetchTasks(filters);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  return {
    tasks,
    pagy,
    filters,
    isLoading,
    fetchTasks,
    setStatus,
    setExperienceRewardRange,
    setCharacterId,
    setSortBy,
    goToPage,
    createTask,
    updateTask,
    deleteTask,
  };
};
