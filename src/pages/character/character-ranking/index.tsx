import { JSX, useState } from "react";
import { useCharacterRanking } from "../../../hooks";
import { Trophy, ArrowDown, ArrowUp } from "@styled-icons/remix-fill";
import { Sword, Coins, Fire } from "@styled-icons/remix-line";
import { Scroll } from "@styled-icons/fa-solid";
import { Crown } from "@styled-icons/boxicons-regular";

import * as S from "./styles";
import { motion } from "framer-motion";

export const CharacterRankingPage = () => {
  const { ranking, isLoading } = useCharacterRanking();
  const [expandedRanking, setExpandedRanking] = useState<string | null>(null);

  const toggleRanking = (type: string) => {
    setExpandedRanking(expandedRanking === type ? null : type);
  };

  if (isLoading || !ranking) {
    return (
      <S.LoadingContainer>
        <S.LoadingAnimation>
          <Sword size={48} className="sword-spin" />
          <span>Carregando ranking dos herois...</span>
        </S.LoadingAnimation>
      </S.LoadingContainer>
    );
  }

  const renderRankingItem = (
    item: [string, number],
    index: number,
    icon: JSX.Element
  ) => (
    <S.RankingItem key={item[0]}>
      <S.RankPosition>{index + 1}</S.RankPosition>

      {index === 0 ? (
        <Crown size={20} className="crown-icon" />
      ) : (
        <S.RankIcon>{icon}</S.RankIcon>
      )}

      <S.RankName>{item[0]}</S.RankName>
      <S.RankValue>{item[1].toLocaleString()}</S.RankValue>
    </S.RankingItem>
  );

  const renderRankingSection = (
    title: string,
    subtitle: string,
    data: [string, number][],
    icon: JSX.Element,
    type: string
  ) => {
    const showAll = expandedRanking === type;
    const displayData = showAll ? data : data.slice(0, 5);

    return (
      <S.RankingCard>
        <S.RankingHeader>
          {icon}
          <div>
            <S.RankingTitle>{title}</S.RankingTitle>
            <S.RankingSubtitle>{subtitle}</S.RankingSubtitle>
          </div>
        </S.RankingHeader>

        <S.RankingList>
          {displayData.map((item, index) =>
            renderRankingItem(item, index, icon)
          )}
        </S.RankingList>

        {data.length > 5 && (
          <S.ToggleButton onClick={() => toggleRanking(type)}>
            {showAll ? (
              <>
                <ArrowUp size={16} />
                Mostrar menos
              </>
            ) : (
              <>
                <ArrowDown size={16} />
                Mostrar todos ({data.length})
              </>
            )}
          </S.ToggleButton>
        )}
      </S.RankingCard>
    );
  };

  return (
    <S.RankingContainer>
      <S.FloatingParticles>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: Math.random() * 100 }}
            animate={{
              y: [0, 50, 0],
              x: [Math.random() * 100, Math.random() * 100 + 50],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? "✨" : i % 2 === 0 ? "⚔️" : "🛡️"}
          </motion.div>
        ))}
      </S.FloatingParticles>
      <S.TitleContainer>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.MainTitle>Hall da Fama dos Herois</S.MainTitle>
          <S.MainSubtitle>
            "Onde os fracos não têm vez e os fortes são lembrados"
          </S.MainSubtitle>
        </motion.div>
      </S.TitleContainer>

      <S.RankingsGrid>
        {renderRankingSection(
          "Monges do Autodesenvolvimento",
          "Fazem cursos até no banheiro para alcançar a iluminação",
          ranking.missions_completed,
          <Scroll size={24} />,
          "missions"
        )}

        {renderRankingSection(
          "Guerreiros do Expediente",
          "Realizam atendimentos como se fossem dragões a serem abatidos",
          ranking.tasks_completed,
          <Trophy size={24} />,
          "tasks"
        )}

        {renderRankingSection(
          "Midas Modernos",
          "Tudo que tocam vira ouro",
          ranking.gold_earned,
          <Coins size={24} />,
          "gold"
        )}

        {renderRankingSection(
          "Sábios da Experiência",
          "Já viram coisas que vocês não acreditariam",
          ranking.experience,
          <Fire size={24} />,
          "experience"
        )}

        {renderRankingSection(
          "Caçadores de Chefes",
          "Transformam batalhas difíceis em lanches gratuitos",
          ranking.bosses_killed,
          <Sword size={24} />,
          "bosses"
        )}
      </S.RankingsGrid>

      <S.FooterNote>
        Atualizado no último nascer da lua. Rankings podem mudar a qualquer
        momento!
      </S.FooterNote>
    </S.RankingContainer>
  );
};
