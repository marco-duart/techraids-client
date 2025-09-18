import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  GetArcaneAnnouncements,
  CreateArcaneAnnouncement,
  DeleteArcaneAnnouncement,
  UpdateArcaneAnnouncement,
} from "../services/arcane-announcement";
import {
  IArcaneAnnouncement,
  ICreateArcaneAnnouncement,
  IUpdateArcaneAnnouncement,
} from "../services/arcane-announcement/DTO";
import { useAuth } from "../context/user-provider";

export const useArcaneAnnouncements = () => {
  const { token } = useAuth();
  const [arcaneAnnouncements, setArcaneAnnouncements] = useState<
    IArcaneAnnouncement.Model[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArcaneAnnouncements = async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetArcaneAnnouncements({ token });
    if (result.success && result.data) {
      setArcaneAnnouncements(result.data);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const createArcaneAnnouncement = async (
    data: Omit<ICreateArcaneAnnouncement.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateArcaneAnnouncement({ ...data, token });
    if (result.success) {
      await fetchArcaneAnnouncements();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const updateArcaneAnnouncement = async (
    data: Omit<IUpdateArcaneAnnouncement.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdateArcaneAnnouncement({ ...data, token });
    if (result.success) {
      await fetchArcaneAnnouncements();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deleteArcaneAnnouncement = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await DeleteArcaneAnnouncement({ id, token });
    if (result.success) {
      await fetchArcaneAnnouncements();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchArcaneAnnouncements();
  }, [token]);

  return {
    arcaneAnnouncements,
    isLoading,
    fetchArcaneAnnouncements,
    createArcaneAnnouncement,
    updateArcaneAnnouncement,
    deleteArcaneAnnouncement,
  };
};
