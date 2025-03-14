import { useEffect, useState } from "react";
import { useAuth } from "../context/user-provider";
import { GetCharacterQuest } from "../services/character-quest";
import { IGetCharacterQuest } from "../services/character-quest/DTO";

export const useCharacterQuest = () => {
  const { token } = useAuth();
  const [data, setData] = useState<IGetCharacterQuest.Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacterQuest = async () => {
    if (!token) {
      setError("Token não disponível.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await GetCharacterQuest({ token });

    if (result.success && result.data) {
      setData(result.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCharacterQuest();
  }, [token]);

  const refresh = () => {
    fetchCharacterQuest();
  };

  return {
    data,
    isLoading,
    error,
    refresh,
  };
};
