import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/user-provider";
import {
  GetNarratorQuest,
} from "../services/narrator-guild";
import { IGetNarratorQuest } from "../services/narrator-guild/DTO";
import toast from "react-hot-toast";

export const useNarratorQuest = () => {
  const { token } = useAuth();
  const [data, setData] = useState<IGetNarratorQuest.Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNarratorQuest = useCallback(async () => {
    if (!token) {
      toast.error("Token não disponível.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await GetNarratorQuest({ token });

      if (result.success && result.data) {
        setData(result.data);
        toast.success("Dados da jornada carregados com sucesso!");
      } else {
        toast.error(result.message || "Erro ao carregar dados da jornada");
      }
    } catch (error) {
      toast.error("Erro ao carregar dados da jornada");
      console.error("fetchNarratorQuest error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNarratorQuest();
  }, [token, fetchNarratorQuest]);

  const refresh = useCallback(() => {
    toast.promise(fetchNarratorQuest(), {
      loading: "Atualizando dados...",
      success: "Dados atualizados com sucesso!",
      error: "Erro ao atualizar dados",
    });
  }, [fetchNarratorQuest]);

  return {
    data,
    isLoading,
    refresh
  };
};
