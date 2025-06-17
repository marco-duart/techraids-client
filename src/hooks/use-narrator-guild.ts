import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GetGuildMembers } from "../services/narrator-guild";
import { IGetGuildMembers } from "../services/narrator-guild/DTO";
import { useAuth } from "../context/user-provider";

export const useNarratorGuild = () => {
  const { token } = useAuth();
  const [guildMembers, setGuildMembers] = useState<IGetGuildMembers.Response>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchGuildMembers = async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetGuildMembers({ token });
    if (result.success && result.data) {
      setGuildMembers(result.data);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchGuildMembers();
  }, [token]);

  return {
    guildMembers,
    isLoading,
    fetchGuildMembers,
  };
};
