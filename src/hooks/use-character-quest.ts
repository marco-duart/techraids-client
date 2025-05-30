import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/user-provider";
import {
  GetCharacterQuest,
  ProgressChapter,
  DefeatBoss,
} from "../services/character-quest";
import { IGetCharacterQuest } from "../services/character-quest/DTO";

export const useCharacterQuest = () => {
  const { token } = useAuth();
  const [data, setData] = useState<IGetCharacterQuest.Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacterQuest = useCallback(async () => {
    if (!token) {
      setError("Token não disponível.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await GetCharacterQuest({ token });

    if (result.success && result.data) {
      setData(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    fetchCharacterQuest();
  }, [token, fetchCharacterQuest]);

  const progressChapter = useCallback(async () => {
    if (!token) {
      setError("Token não disponível.");
      return { success: false };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await ProgressChapter({ token });

      if (result.success) {
        await fetchCharacterQuest();
      } else {
        setError(result.message);
      }

      return result;
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchCharacterQuest]);

  const defeatBoss = useCallback(async () => {
    if (!token) {
      setError("Token não disponível.");
      return { success: false };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await DefeatBoss({ token });

      if (result.success) {
        await fetchCharacterQuest();
      } else {
        setError(result.message);
      }

      return result;
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchCharacterQuest]);

  const refresh = useCallback(() => {
    fetchCharacterQuest();
  }, [fetchCharacterQuest]);

  return {
    data,
    isLoading,
    error,
    refresh,
    progressChapter,
    defeatBoss,
  };
};
