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
  IGetMissions,
  IPaginationInfo,
} from "../services/mission/DTO";
import { useAuth } from "../context/user-provider";

export const useMissions = () => {
  const { token } = useAuth();
  const [missions, setMissions] = useState<IMission.Model[]>([]);
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
  const [filters, setFilters] = useState<IGetMissions.FilterParams>({
    page: 1,
    items: 10,
  });

  const fetchMissions = async (newFilters?: IGetMissions.FilterParams) => {
    if (!token) return;

    setIsLoading(true);
    const filtersToUse = newFilters || filters;
    
    const result = await GetMissions({ 
      token,
      filters: filtersToUse,
    });
    if (result.success && result.data) {
      setMissions(result.data.data);
      setPagy(result.data.pagy);
      setFilters(filtersToUse);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const setStatus = (status: "pending" | "approved" | "rejected" | undefined) => {
    fetchMissions({ ...filters, status, page: 1 });
  };

  const setGoldRewardRange = (min?: number, max?: number) => {
    fetchMissions({ 
      ...filters, 
      gold_reward_min: min,
      gold_reward_max: max,
      page: 1,
    });
  };

  const setCharacterId = (characterId?: number) => {
    fetchMissions({ ...filters, character_id: characterId, page: 1 });
  };

  const setSortBy = (sortBy: "status" | "gold_reward" | "created_at" | "updated_at", direction: "asc" | "desc") => {
    fetchMissions({ ...filters, sort_by: sortBy, sort_direction: direction, page: 1 });
  };

  const goToPage = (page: number) => {
    fetchMissions({ ...filters, page });
  };

  const createMission = async (data: Omit<ICreateMission.Params, "token">) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateMission({ ...data, token });
    if (result.success) {
      await fetchMissions(filters);
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
      await fetchMissions(filters);
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
      await fetchMissions(filters);
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
    pagy,
    filters,
    isLoading,
    fetchMissions,
    setStatus,
    setGoldRewardRange,
    setCharacterId,
    setSortBy,
    goToPage,
    createMission,
    updateMission,
    deleteMission,
  };
};
