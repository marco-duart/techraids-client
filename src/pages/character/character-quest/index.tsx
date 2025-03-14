import { useState } from "react";
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

const CharacterQuestPage = () => {
  const { data, isLoading, error } = useCharacterQuest();
  const { user } = useAuth();
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return <div>Nenhum dado disponível.</div>;

  const { quest, last_task, last_mission, current_chapter, guild_members } =
    data;

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
        <CharacterQuestDetail
          current_chapter={current_chapter}
          guild_members={guild_members}
          user={user}
        />
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

const CharacterQuestDetail = ({
  current_chapter,
  guild_members,
  user,
}: {
  current_chapter: IChapter.Model;
  guild_members: IGuildMember.Model[];
  user: IUser.UserWithRelations | null;
}) => {
  const membersInSameChapter = guild_members.filter(
    (member) => member.current_chapter.id === current_chapter.id
  );
  const membersInPreviousChapters = guild_members.filter(
    (member) => member.current_chapter.id < current_chapter.id
  );
  const membersInNextChapters = guild_members.filter(
    (member) => member.current_chapter.id > current_chapter.id
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <S.ChallengeBackground />
      <S.ChapterMarker />
      <S.CharacterAndGuildContainer>
        <S.CharacterCircle>
          <img src={user?.character_class.image_url} alt="Character" />
          <S.CharacterTooltip>
            <h3>{user?.nickname}</h3>
            <p>{user?.character_class.name}</p>
            <p>Nível: {user?.current_level}</p>
          </S.CharacterTooltip>
        </S.CharacterCircle>
        <S.GuildMembersContainer>
          {membersInSameChapter.map((member) => (
            <S.GuildMemberCircle key={member.nickname}>
              <img src={member.character_class.image_url} alt="Guild Member" />
              <S.GuildMemberTooltip>
                <h4>{member.nickname}</h4>
                <p>{member.character_class.name}</p>
                <p>Nível: {member.current_level}</p>
              </S.GuildMemberTooltip>
            </S.GuildMemberCircle>
          ))}
        </S.GuildMembersContainer>
      </S.CharacterAndGuildContainer>
      <S.PreviousChapterMembers>
        {membersInPreviousChapters.map((member) => (
          <S.GuildMemberCircle key={member.nickname}>
            <img src={member.character_class.image_url} alt="Guild Member" />
            <S.GuildMemberTooltip>
              <h4>{member.nickname}</h4>
              <p>{member.character_class.name}</p>
              <p>Nível: {member.current_level}</p>
            </S.GuildMemberTooltip>
          </S.GuildMemberCircle>
        ))}
      </S.PreviousChapterMembers>
      <S.NextChapterMembers>
        {membersInNextChapters.map((member) => (
          <S.GuildMemberCircle key={member.nickname}>
            <img src={member.character_class.image_url} alt="Guild Member" />
            <S.GuildMemberTooltip>
              <h4>{member.nickname}</h4>
              <p>{member.character_class.name}</p>
              <p>Nível: {member.current_level}</p>
            </S.GuildMemberTooltip>
          </S.GuildMemberCircle>
        ))}
      </S.NextChapterMembers>
    </motion.div>
  );
};

export default CharacterQuestPage;
