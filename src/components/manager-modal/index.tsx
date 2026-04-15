import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as S from "./styles";
import { Sword, Skull } from "@styled-icons/remix-fill";
import { Users } from "@styled-icons/entypo";
import { IGetNarratorQuest } from "../../services/narrator-guild/DTO";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chapter: IGetNarratorQuest.ChapterWithCharactersAndBoss;
  hints?: IGetNarratorQuest.Hints;
  isLoading: boolean;
}

interface TooltipState {
  visible: boolean;
  content: {
    nickname: string;
    className: string;
    level: number;
    experience: number;
  };
  position: {
    x: number;
    y: number;
  };
}

interface BossTooltipState {
  visible: boolean;
  position: {
    x: number;
    y: number;
  };
}

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value);

const ManagerModal: React.FC<Props> = ({ isOpen, onClose, chapter, hints }) => {
  const [currentView, setCurrentView] = useState<"info" | "battle">("info");
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    content: { nickname: "", className: "", level: 0, experience: 0},
    position: { x: 0, y: 0 },
  });
  const [bossTooltip, setBossTooltip] = useState<BossTooltipState>({
    visible: false,
    position: { x: 0, y: 0 },
  });

  const hasCharacters = !!chapter.guild_members?.length;
  const hasBoss = !!chapter.boss;
  const chapterMembersCount = chapter.guild_members?.length || 0;
  const chapterTeamXp =
    chapter.guild_members?.reduce((total, member) => total + member.experience, 0) ||
    0;
  const chapterRequiredXp = chapter.required_xp ?? chapter.required_experience;
  const bossRequiredXp = chapter.boss?.defeat_threshold;
  const controlRequiredXp = bossRequiredXp ?? chapterRequiredXp;
  const progressPercent =
    controlRequiredXp > 0
      ? Math.min((chapterTeamXp / controlRequiredXp) * 100, 100)
      : 0;

  const nextBossOnCurrentChapter =
    hints?.next_boss.available && hints.next_boss.chapter_id === chapter.id
      ? hints.next_boss
      : null;

  const handleMouseEnter = (event: React.MouseEvent, member: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      content: {
        nickname: member.nickname,
        className: member.character_class.name,
        level: member.current_level,
        experience: member.experience,
      },
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const handleBossMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setBossTooltip({
      visible: true,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
    });
  };

  const handleBossMouseLeave = () => {
    setBossTooltip({ ...bossTooltip, visible: false });
  };

  if (!isOpen) return null;

  const renderInfoView = () => (
    <S.ChapterDescription
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <S.ControlPanel>
        <h3>Controle do Capítulo</h3>
        <S.ControlGrid>
          <S.ControlItem>
            <span>Aventureiros no capítulo</span>
            <strong>{chapterMembersCount}</strong>
          </S.ControlItem>
          <S.ControlItem>
            <span>XP atual do time</span>
            <strong>{formatNumber(chapterTeamXp)}</strong>
          </S.ControlItem>
          <S.ControlItem>
            <span>XP necessária do capítulo</span>
            <strong>{formatNumber(chapterRequiredXp)}</strong>
          </S.ControlItem>
          <S.ControlItem>
            <span>XP para derrotar boss</span>
            <strong>{formatNumber(bossRequiredXp || 0)}</strong>
          </S.ControlItem>
        </S.ControlGrid>

        <S.ProgressLabel>
          Progresso para meta de combate: {formatNumber(progressPercent)}%
        </S.ProgressLabel>
        <S.ProgressBar>
          <S.ProgressFill $value={progressPercent} />
        </S.ProgressBar>

        {nextBossOnCurrentChapter && (
          <S.NextBossContext>
            <p>
              Este capítulo é o próximo alvo: <strong>{nextBossOnCurrentChapter.boss_name}</strong>
            </p>
            <p>
              Gap de XP atual: <strong>{formatNumber(nextBossOnCurrentChapter.xp_gap)}</strong>
              {typeof nextBossOnCurrentChapter.estimated_days_to_defeat === "number"
                ? ` | Estimativa: ${nextBossOnCurrentChapter.estimated_days_to_defeat} dias`
                : ""}
            </p>
          </S.NextBossContext>
        )}
      </S.ControlPanel>

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
          <p>
            <strong>Limiar de Derrota:</strong> {chapter.boss.defeat_threshold}
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
            <S.TeamTitle>
              <Users size={20} />
              <span>Aventureiros Presentes:</span>
            </S.TeamTitle>

            <S.TeamMembersContainer>
              <AnimatePresence>
                {chapter.guild_members?.map((member, index) => (
                  <S.TooltipContainer
                    key={`member-${member.nickname}`}
                    onMouseEnter={(e) => handleMouseEnter(e, member)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <S.MemberCard
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
                    </S.MemberCard>
                  </S.TooltipContainer>
                ))}
              </AnimatePresence>
            </S.TeamMembersContainer>
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
          <S.TooltipContainer
            onMouseEnter={handleBossMouseEnter}
            onMouseLeave={handleBossMouseLeave}
          >
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
          </S.TooltipContainer>
        )}
      </S.BattleContainer>
    );
  };

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

        <S.GlobalTooltip
          $visible={tooltip.visible}
          $x={tooltip.position.x}
          $y={tooltip.position.y}
        >
          <S.TooltipTitle>{tooltip.content.nickname}</S.TooltipTitle>
          <S.TooltipText>{tooltip.content.className}</S.TooltipText>
          <S.TooltipText>Nível: {tooltip.content.level}</S.TooltipText>
          <S.TooltipText>Experiência: {tooltip.content.experience}</S.TooltipText>
        </S.GlobalTooltip>

        {chapter.boss && (
          <S.GlobalTooltip
            $visible={bossTooltip.visible}
            $x={bossTooltip.position.x}
            $y={bossTooltip.position.y}
          >
            <S.TooltipTitle>{chapter.boss.name}</S.TooltipTitle>
            <S.TooltipText>
              Limiar de Derrota: {chapter.boss.defeat_threshold}
            </S.TooltipText>
            <S.TooltipText>
              Recompensa: {chapter.boss.reward_description}
            </S.TooltipText>
            <S.TooltipText>
              Recompensa Reclamada: {chapter.boss.reward_claimed ? "Sim" : "Não"}
            </S.TooltipText>
          </S.GlobalTooltip>
        )}

        {(hasCharacters || hasBoss) && (
          <S.StateSwitchButton
            onClick={() =>
              setCurrentView(currentView === "info" ? "battle" : "info")
            }
          >
            {currentView === "info" ? "Ver Batalha" : "Ver Informações"}
          </S.StateSwitchButton>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ManagerModal;
