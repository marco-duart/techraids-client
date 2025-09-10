import { useEffect } from "react";
import * as S from "./styles";
import { useNarratorGuildRewards } from "../../../hooks/use-narrator-guild-rewards";
import { IconButton } from "../../../components/buttons/icon-button";
import { Person, People } from "@styled-icons/bootstrap";
import LoadingSpinner from "../../../components/loading-spinner";

export const NarratorGuildRewardsPage = () => {
  const { pendingRewards, deliverRewards, isLoading, fetchPendingRewards } =
    useNarratorGuildRewards();

  useEffect(() => {
    fetchPendingRewards();
  }, []);

  const handleDeliverBossReward = async (bossId: number) => {
    await deliverRewards({ boss_id: bossId });
  };

  const handleDeliverChestReward = async (chestId: number) => {
    await deliverRewards({ character_treasure_chest_id: chestId });
  };

  if (isLoading && !pendingRewards) {
    return (
      <S.PageContainer>
        <S.LoadingWrapper>
          <LoadingSpinner />
        </S.LoadingWrapper>
      </S.PageContainer>
    );
  }

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Recompensas Pendentes</S.Title>
      </S.Header>

      <S.RewardsContainer>
        <S.Section>
          <S.SectionTitle>
            <People size={24} />
            Recompensas de Bosses
          </S.SectionTitle>

          {pendingRewards?.pending_bosses &&
          pendingRewards.pending_bosses.length > 0 ? (
            <S.RewardList>
              {pendingRewards.pending_bosses.map((boss) => (
                <S.RewardItem key={boss.id}>
                  <S.RewardInfo>
                    <S.RewardTitle>{boss.name}</S.RewardTitle>
                    <S.RewardDescription>{boss.slogan}</S.RewardDescription>
                    <S.RewardDescription>
                      {boss.reward_description}
                    </S.RewardDescription>
                    <S.RewardDate>
                      Derrotado em:{" "}
                      {new Date(boss.updated_at).toLocaleDateString()}
                    </S.RewardDate>
                  </S.RewardInfo>
                  <S.DeliverButton
                    onClick={() => handleDeliverBossReward(boss.id)}
                    disabled={isLoading}
                  >
                    Entregar
                  </S.DeliverButton>
                </S.RewardItem>
              ))}
            </S.RewardList>
          ) : (
            <S.EmptyMessage>Nenhuma recompensa de boss pendente</S.EmptyMessage>
          )}
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <Person size={24} />
            Recompensas de Baús do Tesouro
          </S.SectionTitle>

          {pendingRewards?.pending_chests &&
          pendingRewards.pending_chests.length > 0 ? (
            <S.RewardList>
              {pendingRewards.pending_chests.map((chest) => (
                <S.RewardItem key={chest.id}>
                  <S.RewardInfo>
                    <S.RewardTitle>
                      {chest.character_name} - {chest.reward_name}
                    </S.RewardTitle>
                    <S.RewardDescription>
                      {chest.reward_description}
                    </S.RewardDescription>
                    <S.RewardDate>
                      Conquistado em:{" "}
                      {new Date(chest.created_at).toLocaleDateString()}
                    </S.RewardDate>
                  </S.RewardInfo>
                  <S.DeliverButton
                    onClick={() => handleDeliverChestReward(chest.id)}
                    disabled={isLoading}
                  >
                    Entregar
                  </S.DeliverButton>
                </S.RewardItem>
              ))}
            </S.RewardList>
          ) : (
            <S.EmptyMessage>Nenhuma recompensa de baú pendente</S.EmptyMessage>
          )}
        </S.Section>
      </S.RewardsContainer>
    </S.PageContainer>
  );
};
