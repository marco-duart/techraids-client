import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  GetTreasureChests,
  CreateTreasureChest,
  ActivateTreasureChest,
  DeactivateTreasureChest,
} from "../services/treasure-chest";
import {
  ITreasureChest,
  ICreateTreasureChest,
} from "../services/treasure-chest/DTO";
import { useAuth } from "../context/user-provider";

export const useTreasureChests = () => {
  const { token } = useAuth();
  const [treasureChests, setTreasureChests] = useState<ITreasureChest.Model[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchTreasureChests = async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetTreasureChests({ token });
    if (result.success && result.data) {
      setTreasureChests(result.data);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const createTreasureChest = async (
    data: Omit<ICreateTreasureChest.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateTreasureChest({ ...data, token });
    if (result.success) {
      await fetchTreasureChests();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const activateTreasureChest = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await ActivateTreasureChest({ id, token });
    if (result.success) {
      await fetchTreasureChests();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deactivateTreasureChest = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await DeactivateTreasureChest({ id, token });
    if (result.success) {
      await fetchTreasureChests();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTreasureChests();
  }, [token]);

  return {
    treasureChests,
    isLoading,
    fetchTreasureChests,
    createTreasureChest,
    activateTreasureChest,
    deactivateTreasureChest,
  };
};
