import React, { useState, Suspense, lazy } from "react";
import { useCharacterQuest } from "../../../hooks/use-character-quest";
import { useAuth } from "../../../context/user-provider";
import { motion } from "framer-motion";
import * as S from "./styles";
import { IMAGES } from "../../../utils/constants";

import { IQuest } from "../../../services/quest/DTO";
import { ITask } from "../../../services/task/DTO";
import { IMission } from "../../../services/mission/DTO";
import { IUser } from "../../../services/auth/DTO";
import BackgroundMusic from "../../../components/background-music";
import LoadingSpinner from "../../../components/loading-spinner";
import { IGetCharacterQuest } from "../../../services/character-quest/DTO";

const InteractiveMap = lazy(
  () => import("../../../components/interactive-map")
);

export const CharacterQuestPage = () => {
  const { data, isLoading, defeatBoss, progressChapter } = useCharacterQuest();
  const { user } = useAuth();
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);

  const handleProgressChapter = async () => {
    return await progressChapter();
  };

  const handleDefeatBoss = async () => {
    return await defeatBoss();
  };

  if (isLoading) return <LoadingSpinner />;
  if (!data) return <div>Nenhum dado disponível.</div>;

  const { quest, last_task, last_mission } = data;

  return (
    <S.PageContainer>
      <BackgroundMusic />
      {!isChallengeStarted ? (
        <CharacterQuestResume
          quest={quest}
          last_task={last_task}
          last_mission={last_mission}
          onStartChallenge={() => setIsChallengeStarted(true)}
        />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <CharacterQuestDetail
            user={user}
            chapters={data.chapters}
            isLoading={isLoading}
            onProgressChapter={handleProgressChapter}
            onDefeatBoss={handleDefeatBoss}
          />
        </Suspense>
      )}
    </S.PageContainer>
  );
};

const CharacterQuestResume = ({
  quest,
  last_task,
  last_mission,
  onStartChallenge,
}: {
  quest: IQuest.Model;
  last_task: ITask.Model;
  last_mission: IMission.Model;
  onStartChallenge: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <S.BackgroundImage src={IMAGES.worldMap} alt="World Map" />
      <S.QuestCard>
        <S.QuestTitle>{quest.title}</S.QuestTitle>
        <S.QuestSubtitle>{quest.description}</S.QuestSubtitle>
        <S.TaskStatus $status={last_task.status}>
          Última Tarefa: {last_task.title} ({last_task.status})
        </S.TaskStatus>
        <S.MissionStatus $status={last_mission.status}>
          Última Missão: {last_mission.title} ({last_mission.status})
        </S.MissionStatus>
        <S.StartButton onClick={onStartChallenge}>
          Continuar Jornada
        </S.StartButton>
      </S.QuestCard>
    </motion.div>
  );
};

const CharacterQuestDetail = React.memo(
  ({
    user,
    chapters,
    isLoading,
    onProgressChapter,
    onDefeatBoss,
  }: {
    user: IUser.UserWithRelations | null;
    chapters: IGetCharacterQuest.ChapterWithCharactersAndBoss[];
    isLoading: boolean;
    onProgressChapter: () => Promise<{ success: boolean }>;
    onDefeatBoss: () => Promise<{ success: boolean }>;
  }) => {
    return (
      <InteractiveMap
        user={user}
        chapters={chapters}
        isLoading={isLoading}
        onProgressChapter={onProgressChapter}
        onDefeatBoss={onDefeatBoss}
      />
    );
  }
);
