import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/user-provider";
import {
  GetCharacterQuest,
  ProgressChapter,
  DefeatBoss,
} from "../services/character-quest";
import { IGetCharacterQuest } from "../services/character-quest/DTO";
import toast from "react-hot-toast";

export const useCharacterQuest = () => {
  const { token } = useAuth();
  const [data, setData] = useState<IGetCharacterQuest.Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharacterQuest = useCallback(async () => {
    if (!token) {
      toast.error("Token não disponível.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await GetCharacterQuest({ token });

      if (result.success && result.data) {
        setData(result.data);
        toast.success("Dados da jornada carregados com sucesso!");
      } else {
        toast.error(result.message || "Erro ao carregar dados da jornada");
      }
    } catch (error) {
      toast.error("Erro ao carregar dados da jornada");
      console.error("fetchCharacterQuest error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCharacterQuest();
  }, [token, fetchCharacterQuest]);

  const progressChapter = useCallback(async () => {
    if (!token) {
      toast.error("Token não disponível.");
      return { success: false };
    }

    setIsLoading(true);

    try {
      const result = await ProgressChapter({ token });

      if (result.success) {
        toast.success("Capítulo avançado com sucesso!");
        await fetchCharacterQuest();
      } else {
        toast.error(result.message || "Erro ao avançar capítulo");
      }

      return result;
    } catch (error) {
      toast.error("Erro ao avançar capítulo");
      console.error("progressChapter error:", error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchCharacterQuest]);

  const defeatBoss = useCallback(async () => {
    if (!token) {
      toast.error("Token não disponível.");
      return { success: false };
    }

    setIsLoading(true);

    try {
      const result = await DefeatBoss({ token });

      if (result.success) {
        toast.success("Chefe derrotado com sucesso!");
        await fetchCharacterQuest();
      } else {
        toast.error(result.message || "Erro ao derrotar chefe");
      }

      return result;
    } catch (error) {
      toast.error("Erro ao derrotar chefe");
      console.error("defeatBoss error:", error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchCharacterQuest]);

  const refresh = useCallback(() => {
    toast.promise(fetchCharacterQuest(), {
      loading: "Atualizando dados...",
      success: "Dados atualizados com sucesso!",
      error: "Erro ao atualizar dados",
    });
  }, [fetchCharacterQuest]);

  return {
    data,
    isLoading,
    refresh,
    progressChapter,
    defeatBoss,
  };
};
