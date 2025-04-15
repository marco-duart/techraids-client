import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GetCharacterRanking } from "../services/character_ranking";
import { IGetCharacterRanking } from "../services/character_ranking/DTO";
import { useAuth } from "../context/user-provider";

export const useCharacterRanking = () => {
  const { token } = useAuth();
  const [ranking, setRanking] = useState<
    IGetCharacterRanking.Response | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const fetchRanking = async () => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetCharacterRanking({ token });
    if (result.success) {
      setRanking(result.data);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchRanking();
  }, [token]);

  return {
    ranking,
    isLoading,
    fetchRanking,
  };
};
