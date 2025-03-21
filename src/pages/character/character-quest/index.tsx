import React, { useState, Suspense, lazy } from "react";
import { useCharacterQuest } from "../../../hooks/use-character-quest";
import { useAuth } from "../../../context/user-provider";
import { motion } from "framer-motion";
import * as S from "./styles";
import { IMAGES } from "../../../utils/constants";

import { IGuildMember } from "../../../services/character-quest/DTO";
import { IChapter } from "../../../services/chapter/DTO";
import { IQuest } from "../../../services/quest/DTO";
import { ITask } from "../../../services/task/DTO";
import { IMission } from "../../../services/mission/DTO";
import { IUser } from "../../../services/auth/DTO";

const InteractiveMap = lazy(
  () => import("../../../components/interactive-map")
);

export const CharacterQuestPage = () => {
  const { data, isLoading, error } = useCharacterQuest();
  const { user } = useAuth();
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return <div>Nenhum dado disponível.</div>;

  const {
    quest,
    chapters,
    last_task,
    last_mission,
    current_chapter,
    guild_members,
  } = data;

  return (
    <S.PageContainer>
      {!isChallengeStarted ? (
        <CharacterQuestResume
          quest={quest}
          last_task={last_task}
          last_mission={last_mission}
          onStartChallenge={() => setIsChallengeStarted(true)}
        />
      ) : (
        <Suspense fallback={<div>Carregando mapa...</div>}>
          <CharacterQuestDetail
            chapters={chapters}
            current_chapter={current_chapter}
            guild_members={guild_members}
            user={user}
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
        <S.TaskStatus status={last_task.status}>
          Última Tarefa: {last_task.title} ({last_task.status})
        </S.TaskStatus>
        <S.MissionStatus status={last_mission.status}>
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
    chapters,
    current_chapter,
    guild_members,
    user,
  }: {
    chapters: IChapter.Model[];
    current_chapter: IChapter.Model;
    guild_members: IGuildMember.Model[];
    user: IUser.UserWithRelations | null;
  }) => {
    return (
      <InteractiveMap
        chapters={chapters}
        guildMembers={guild_members}
        currentChapter={current_chapter}
        user={user}
      />
    );
  }
);
