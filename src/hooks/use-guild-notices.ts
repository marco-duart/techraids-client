import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  GetGuildNotices,
  CreateGuildNotice,
  UpdateGuildNotice,
  DeleteGuildNotice,
} from "../services/guild-notice";
import {
  ICreateGuildNotice,
  IUpdateGuildNotice,
  IGuildNotice,
} from "../services/guild-notice/DTO";
import { useAuth } from "../context/user-provider";

export const useGuildNotices = () => {
  const { token } = useAuth();
  const [guildNotices, setGuildNotices] = useState<IGuildNotice.Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGuildNotices = async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetGuildNotices({ token });
    if (result.success && result.data) {
      setGuildNotices(result.data);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const createGuildNotice = async (
    data: Omit<ICreateGuildNotice.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateGuildNotice({ ...data, token });
    if (result.success) {
      await fetchGuildNotices();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const updateGuildNotice = async (
    data: Omit<IUpdateGuildNotice.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdateGuildNotice({ ...data, token });
    if (result.success) {
      await fetchGuildNotices();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deleteGuildNotice = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await DeleteGuildNotice({ id, token });
    if (result.success) {
      await fetchGuildNotices();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchGuildNotices();
  }, [token]);

  return {
    guildNotices,
    isLoading,
    fetchGuildNotices,
    createGuildNotice,
    updateGuildNotice,
    deleteGuildNotice,
  };
};
