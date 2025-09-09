import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { DeliverRewards, GetPendingRewards } from "../services/narrator-guild";
import {
  IDeliverRewards,
  IGetPendingRewards,
} from "../services/narrator-guild/DTO";
import { useAuth } from "../context/user-provider";

export const useNarratorGuildRewards = () => {
  const { token } = useAuth();
  const [pendingRewards, setPendingRewards] =
    useState<IGetPendingRewards.Response>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPendingRewards = async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetPendingRewards({ token });
    if (result.success && result.data) {
      setPendingRewards(result.data);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deliverRewards = async (
    params: Omit<IDeliverRewards.Params, "token">
  ) => {
    if (!token) return;

    setIsLoading(true);

    const result = await DeliverRewards({ token, ...params });
    if (result.success) {
      toast.success(result.message);
      fetchPendingRewards();
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPendingRewards;
  }, [token]);

  return {
    pendingRewards,
    fetchPendingRewards,
    deliverRewards,
    isLoading,
  };
};
