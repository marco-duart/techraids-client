import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/user-provider";
import {
  GetCharacterQuest,
  ProgressChapter,
  DefeatBoss,
} from "../services/character-quest";
import { IGetCharacterQuest } from "../services/character-quest/DTO";

export const useCharacterQuest = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch: fetchCharacterQuest,
  } = useQuery<IGetCharacterQuest.Response | undefined>({
    queryKey: ["characterQuest"],
    queryFn: async () => {
      if (!token) return undefined;
      const result = await GetCharacterQuest({ token });
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
    enabled: !!token,
  });

  const progressChapterMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Token não disponível.");
      const result = await ProgressChapter({ token });
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characterQuest"] });
    },
  });

  const defeatBossMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Token não disponível.");
      const result = await DefeatBoss({ token });
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characterQuest"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    refresh: fetchCharacterQuest,
    progressChapter: progressChapterMutation.mutateAsync,
    defeatBoss: defeatBossMutation.mutateAsync,
    isProgressing: progressChapterMutation.isPending,
    isDefeating: defeatBossMutation.isPending,
  };
};
