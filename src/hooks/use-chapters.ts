import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  GetChapters
} from "../services/chapter";
import { IChapter } from "../services/chapter/DTO";
import { useAuth } from "../context/user-provider";

export const useChapters = () => {
  const { token } = useAuth();
  const [chapters, setChapters] = useState<IChapter.Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChapters = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetChapters({ token });
    if (result.success && result.data) {
      setChapters(result.data);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters, token]);

  return {
    chapters,
    isLoading,
    fetchChapters,
  };
};
