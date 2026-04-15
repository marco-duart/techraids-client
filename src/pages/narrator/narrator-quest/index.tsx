import React, { lazy } from "react";
import { useNarratorQuest } from "../../../hooks";
import * as S from "./styles";

const ManagerMap = lazy(() => import("../../../components/manager-map"));

export const NarratorQuestPage = React.memo(() => {
  const { data, isLoading, refresh } = useNarratorQuest();

  return (
    <S.PageContainer>
      <ManagerMap
        chapters={data?.chapters}
        hints={data?.hints}
        guildResume={data?.guild_resume}
        isLoading={isLoading}
        onRefresh={refresh}
      />
    </S.PageContainer>
  );
});
