import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  CreateBoss,
  DeleteBoss,
  GetBosses,
  UpdateBoss,
} from "../services/boss";
import { IBoss, ICreateBoss, IUpdateBoss } from "../services/boss/DTO";
import { useAuth } from "../context/user-provider";

type BossWithChapter = IBoss.Model & {
  chapter_title: string;
};

export const useBosses = () => {
  const { token } = useAuth();
  const [bosses, setBosses] = useState<BossWithChapter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBosses = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetBosses({ token });
    if (result.success && result.data) {
      setBosses(result.data);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  }, [token]);

  const createBoss = async (data: Omit<ICreateBoss.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateBoss({ ...data, token });
    if (result.success) {
      await fetchBosses();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const updateBoss = async (data: Omit<IUpdateBoss.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdateBoss({ ...data, token });
    if (result.success) {
      await fetchBosses();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deleteBoss = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await DeleteBoss({ id, token });
    if (result.success) {
      await fetchBosses();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchBosses();
  }, [fetchBosses, token]);

  return {
    bosses,
    isLoading,
    fetchBosses,
    createBoss,
    updateBoss,
    deleteBoss,
  };
};
