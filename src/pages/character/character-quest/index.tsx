import React, { useState, Suspense, lazy } from "react";
import { useCharacterQuest } from "../../../hooks";
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
  const { data, isLoading, defeatBoss, progressChapter, refresh } =
    useCharacterQuest();
  const { user } = useAuth();
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);

  return (
    <S.PageContainer>
      <BackgroundMusic />
      {!isChallengeStarted ? (
        <CharacterQuestResume
          quest={data?.quest}
          last_task={data?.last_task}
          last_mission={data?.last_mission}
          isLoading={isLoading}
          onStartChallenge={() => setIsChallengeStarted(true)}
        />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <CharacterQuestDetail
            user={user}
            chapters={data?.chapters}
            isLoading={isLoading}
            onProgressChapter={progressChapter}
            onDefeatBoss={defeatBoss}
            onRefresh={refresh}
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
  isLoading,
  onStartChallenge,
}: {
  quest?: IQuest.Model;
  last_task?: ITask.Model;
  last_mission?: IMission.Model;
  isLoading: boolean;
  onStartChallenge: () => void;
}) => {
  const isDisabled = !quest || !last_task || !last_mission || isLoading;
  const phrase = isLoading
    ? "Consultando os pergaminhos..."
    : "Nenhuma missão ou tarefa designada.";
  const buttonText = isLoading ? "Aguarde..." : "Continuar Jornada";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <S.BackgroundImage src={IMAGES.worldMap} alt="World Map" />
      <S.QuestCard>
        <S.QuestTitle>{quest?.title || phrase}</S.QuestTitle>
        <S.QuestSubtitle>{quest?.description}</S.QuestSubtitle>
        <S.TaskStatus $status={last_task?.status || "pending"}>
          Última Tarefa: {last_task?.title || phrase} ({last_task?.status})
        </S.TaskStatus>
        <S.MissionStatus $status={last_mission?.status || "pending"}>
          Última Missão: {last_mission?.title || phrase} ({last_mission?.status}
          )
        </S.MissionStatus>
        <S.StartButton onClick={onStartChallenge} disabled={isDisabled}>
          {buttonText}
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
    onRefresh,
  }: {
    user: IUser.UserWithRelations | null;
    chapters?: IGetCharacterQuest.ChapterWithCharactersAndBoss[];
    isLoading: boolean;
    onProgressChapter: () => Promise<{ success: boolean }>;
    onDefeatBoss: () => Promise<{ success: boolean }>;
    onRefresh: () => void;
  }) => {
    return (
      <InteractiveMap
        user={user}
        chapters={chapters}
        isLoading={isLoading}
        onProgressChapter={onProgressChapter}
        onDefeatBoss={onDefeatBoss}
        onRefresh={onRefresh}
      />
    );
  }
);
