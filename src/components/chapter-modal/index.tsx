import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as S from "./styles";
import { Sword, Skull } from "@styled-icons/remix-fill";
import { Scroll } from "@styled-icons/fa-solid";
import { Users } from "@styled-icons/entypo";
import { IGetCharacterQuest } from "../../services/character-quest/DTO";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chapter: IGetCharacterQuest.ChapterWithCharactersAndBoss;
  isLoading: boolean;
  currentExperience: number;
  onProgressChapter: () => Promise<{ success: boolean }>;
  onDefeatBoss: () => Promise<{ success: boolean }>;
}

const ChapterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  chapter,
  isLoading,
  currentExperience,
  onProgressChapter,
  onDefeatBoss,
}) => {
  const [currentView, setCurrentView] = useState<"info" | "battle">("info");

  const hasCharacters =
    chapter.is_hero_chapter || !!chapter.guild_members?.length;
  const hasBoss = !!chapter.boss;

  if (!isOpen) return null;

  const renderInfoView = () => (
    <S.ChapterDescription
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>
        <Scroll size={20} />
        <span> Crônica do Capítulo:</span>
      </h3>
      <p>{chapter.description}</p>

      {chapter.boss && (
        <>
          <h3>
            <Skull size={20} />
            <span> Ameaça do Capítulo:</span>
          </h3>
          <p>{chapter.boss.description}</p>
          <p>
            <strong>Recompensa:</strong> {chapter.boss.reward_description}
          </p>

          {chapter.boss.defeated && chapter.boss.finishing_character && (
            <S.VictoryContainer>
              <S.VictoryBadge>🏆 Feito Heróico 🏆</S.VictoryBadge>
              <p>
                <strong>{chapter.boss.finishing_character.nickname}</strong>{" "}
                entrou para a lenda ao derrotar {chapter.boss.name}!
              </p>
              <S.HeroImage>
                <img
                  src={chapter.boss.finishing_character.image_url}
                  alt={chapter.boss.finishing_character.nickname}
                />
              </S.HeroImage>
            </S.VictoryContainer>
          )}
        </>
      )}
    </S.ChapterDescription>
  );

  const renderBattleView = () => {
    if (!hasCharacters && !hasBoss) {
      return (
        <S.EmptyState
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Sword size={48} />
          <span>
            Este capítulo está desolado... Nenhum aventureiro ou ameaça
            encontrada.
          </span>
        </S.EmptyState>
      );
    }

    return (
      <S.BattleContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {hasCharacters && (
          <S.TeamSection>
            <h3>
              <Users size={20} />
              <span> Aventureiros Presentes:</span>
            </h3>

            <AnimatePresence>
              {chapter.character && (
                <S.MemberCard
                  key={`user-${chapter.character.nickname}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  $isUser
                >
                  <S.MemberImage>
                    <img
                      src={chapter.character.character_class.image_url}
                      alt={chapter.character.nickname}
                    />
                  </S.MemberImage>
                  <S.MemberName>{chapter.character.nickname}</S.MemberName>
                  <S.MemberClass>
                    {chapter.character.character_class.name}
                  </S.MemberClass>
                </S.MemberCard>
              )}

              {chapter.guild_members?.map((member, index) => (
                <S.MemberCard
                  key={`member-${member.nickname}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <S.MemberImage>
                    <img
                      src={member.character_class.image_url}
                      alt={member.nickname}
                    />
                  </S.MemberImage>
                  <S.MemberName>{member.nickname}</S.MemberName>
                  <S.MemberClass>{member.character_class.name}</S.MemberClass>
                </S.MemberCard>
              ))}
            </AnimatePresence>
          </S.TeamSection>
        )}

        {hasCharacters && hasBoss && (
          <S.VSContainer
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            VS
          </S.VSContainer>
        )}

        {hasBoss && (
          <S.BossContainer
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            $defeated={chapter.boss?.defeated}
          >
            <h3>
              <Skull size={20} />
              <span> Ameaça:</span>
            </h3>
            <S.BossImage $defeated={chapter.boss?.defeated}>
              <img src={chapter.boss?.image_url} alt={chapter.boss?.name} />
            </S.BossImage>
            <S.BossName>{chapter.boss?.name}</S.BossName>
            <S.BossDescription>{chapter.boss?.slogan}</S.BossDescription>
            {chapter.boss?.defeated && (
              <S.VictoryText>DERROTADO!</S.VictoryText>
            )}
          </S.BossContainer>
        )}
      </S.BattleContainer>
    );
  };

  const canProgressChapter =
    chapter.is_hero_chapter &&
    currentExperience >= chapter.required_experience &&
    (!chapter.boss || chapter.boss.defeated);

  const canClaimVictory =
    chapter.is_hero_chapter &&
    chapter.boss &&
    !chapter.boss.defeated &&
    chapter.boss.team_can_defeat &&
    chapter.boss.is_finishing_hero;

  const teamCanDefeatBoss =
    chapter.is_hero_chapter &&
    chapter.boss &&
    chapter.boss.team_can_defeat &&
    !chapter.boss.is_finishing_hero;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>

        <S.FloatingParticles>
          {[...Array(5)].map((_, i) => (
            <div key={i}>{i % 2 === 0 ? "⚔️" : "🛡️"}</div>
          ))}
        </S.FloatingParticles>

        <S.ChapterHeader
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.ChapterTitle>{chapter.title}</S.ChapterTitle>
          <S.ChapterSubtitle>{chapter.description}</S.ChapterSubtitle>
        </S.ChapterHeader>

        <AnimatePresence mode="wait">
          {currentView === "info" ? renderInfoView() : renderBattleView()}
        </AnimatePresence>

        {(hasCharacters || hasBoss) && (
          <S.StateSwitchButton
            onClick={() =>
              setCurrentView(currentView === "info" ? "battle" : "info")
            }
          >
            {currentView === "info" ? "Ver Batalha" : "Ver Informações"}
          </S.StateSwitchButton>
        )}

        {canProgressChapter && (
          <>
            <S.ProgressButton onClick={onProgressChapter} disabled={isLoading}>
              {isLoading ? (
                <S.LoadingSpinner />
              ) : (
                "🏰 Avançar para o Próximo Capítulo"
              )}
            </S.ProgressButton>
            {isLoading && (
              <S.LoadingMessage>
                Preparando o próximo capítulo...
              </S.LoadingMessage>
            )}
          </>
        )}

        {canClaimVictory && (
          <>
            <S.DefeatButton onClick={onDefeatBoss} disabled={isLoading}>
              {isLoading ? (
                <S.LoadingSpinner />
              ) : (
                `⚔️ Reivindicar Vitória sobre ${chapter.boss?.name}`
              )}
            </S.DefeatButton>
            {isLoading && (
              <S.LoadingMessage>Preparando a batalha épica...</S.LoadingMessage>
            )}
          </>
        )}

        {teamCanDefeatBoss && (
          <S.TeamMessage>
            💡 Sua equipe tem poder suficiente para desafiar{" "}
            {chapter.boss?.name}! Complete suas missões para reivindicar a
            vitória.
          </S.TeamMessage>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ChapterModal;
