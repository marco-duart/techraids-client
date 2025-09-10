import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  GetMissions,
  CreateMission,
  UpdateMission,
  DeleteMission,
} from "../services/mission";
import {
  ICreateMission,
  IUpdateMission,
  IMission,
} from "../services/mission/DTO";
import { useAuth } from "../context/user-provider";

export const useMissions = () => {
  const { token } = useAuth();
  const [missions, setMissions] = useState<IMission.Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMissions = async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetMissions({ token });
    if (result.success && result.data) {
      setMissions(result.data);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const createMission = async (data: Omit<ICreateMission.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateMission({ ...data, token });
    if (result.success) {
      await fetchMissions();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const updateMission = async (data: Omit<IUpdateMission.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdateMission({ ...data, token });
    if (result.success) {
      await fetchMissions();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deleteMission = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await DeleteMission({ id, token });
    if (result.success) {
      await fetchMissions();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchMissions();
  }, [token]);

  return {
    missions,
    isLoading,
    fetchMissions,
    createMission,
    updateMission,
    deleteMission,
  };
};
