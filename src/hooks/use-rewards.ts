import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  CreateReward,
  GetRewards,
  RemoveRewardStock,
  RestockReward,
} from "../services/reward";
import { IReward, ICreateReward, IRestockReward } from "../services/reward/DTO";
import { useAuth } from "../context/user-provider";

export const useRewards = ({
  treasure_chest_id,
}: {
  treasure_chest_id: number;
}) => {
  const { token } = useAuth();
  const [rewards, setRewards] = useState<IReward.Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRewards = async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetRewards({ token, treasure_chest_id });
    if (result.success && result.data) {
      setRewards(result.data);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const createReward = async (data: Omit<ICreateReward.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateReward({ ...data, token });
    if (result.success) {
      await fetchRewards();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const restockReward = async (data: Omit<IRestockReward.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await RestockReward({ ...data, token });
    if (result.success) {
      await fetchRewards();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const removeRewardStock = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await RemoveRewardStock({ id, token });
    if (result.success) {
      await fetchRewards();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  return {
    rewards,
    isLoading,
    fetchRewards,
    createReward,
    restockReward,
    removeRewardStock,
  };
};
