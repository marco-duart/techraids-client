import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GetTasks, CreateTask, UpdateTask, DeleteTask } from "../services/task";
import {
  IGetTasks,
  ICreateTask,
  IUpdateTask,
  IDeleteTask,
  ITask,
} from "../services/task/DTO";
import { useAuth } from "../context/user-provider";

export const useTasks = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<ITask.Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    const result = await GetTasks({ token });
    if (result.success && result.data) {
      setTasks(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  const createTask = async (data: Omit<ICreateTask.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateTask({ ...data, token });
    if (result.success) {
      await fetchTasks();
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
      await fetchTasks();
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
      await fetchTasks();
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
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
