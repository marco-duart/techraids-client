import { useState } from "react";
import { useCharacterStore } from "../../../hooks";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@styled-icons/boxicons-regular";
import { MagicWand } from "@styled-icons/boxicons-solid";
import { Coin, History, Sword, Shield } from "@styled-icons/remix-fill";
import * as S from "./styles";
import { IMAGES } from "../../../utils/constants";
import { useAuth } from "../../../context/user-provider";
import { IReward } from "../../../services/rewards/DTO";

export const CharacterStorePage = () => {
  const {
    storeItems,
    purchaseHistory,
    openedChest,
    isLoading,
    purchaseChest,
    closeOpenedChest,
  } = useCharacterStore();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"store" | "history">("store");

  if (isLoading || !storeItems || !purchaseHistory) {
    return (
      <S.LoadingContainer>
        <S.LoadingAnimation>
          <Sword size={48} className="sword-spin" />
          <span>Carregando tesouros da loja...</span>
        </S.LoadingAnimation>
      </S.LoadingContainer>
    );
  }

  const getRewardIcon = (rewardType: IReward.RewardType | undefined) => {
    switch (rewardType) {
      case IReward.RewardType.PHYSICAL:
        return <Sword size={24} />;
      case IReward.RewardType.DIGITAL:
        return <MagicWand size={24} />;
      case IReward.RewardType.INGAME:
        return <Shield size={24} />;
      default:
        return <Coin size={24} />;
    }
  };

  return (
    <S.StoreContainer>
      <S.BackgroundImage src={IMAGES.backgroundRanking} alt="Background" />

      <S.HeaderContainer>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.MainTitle>Loja do Tesouro</S.MainTitle>
          <S.MainSubtitle>
            "Onde os bravos gastam seu ouro e os sábios investem em glória"
          </S.MainSubtitle>
        </motion.div>
      </S.HeaderContainer>

      <S.GoldDisplay>
        <Coin size={24} />
        <span>{user?.gold.toLocaleString()} Peças de Ouro</span>
      </S.GoldDisplay>

      <S.TabsContainer>
        <S.TabButton
          $active={activeTab === "store"}
          onClick={() => setActiveTab("store")}
        >
          <Coin size={20} />
          <span>Báu dos Tesouros</span>
        </S.TabButton>
        <S.TabButton
          $active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        >
          <History size={20} />
          <span>Histórico de Compras</span>
        </S.TabButton>
      </S.TabsContainer>

      {activeTab === "store" ? (
        <S.ChestsGrid>
          {storeItems.store_items.map((item) => (
            <S.ChestCard key={item.chest.id}>
              <S.ChestImage
                src={IMAGES.closedChest}
                alt={`Baú ${item.chest.title}`}
              />
              <S.ChestInfo>
                <S.ChestTitle>{item.chest.title}</S.ChestTitle>
                <S.ChestValue>
                  <Coin size={16} />
                  {item.chest.value.toLocaleString()} Gold
                </S.ChestValue>
                <S.ChestRewards>
                  <span>Possíveis recompensas:</span>
                  <ul>
                    {item.possible_rewards.slice(0, 3).map((reward) => (
                      <li key={reward.id}>
                        {getRewardIcon(reward.reward_type)} {reward.name}
                      </li>
                    ))}
                    {item.possible_rewards.length > 3 && (
                      <li>+ {item.possible_rewards.length - 3} outros...</li>
                    )}
                  </ul>
                </S.ChestRewards>
              </S.ChestInfo>
              <S.PurchaseButton
                onClick={() => purchaseChest(item.chest.id)}
                disabled={isLoading || (user?.gold || 0) < item.chest.value}
              >
                {isLoading ? "Comprando..." : "Comprar Baú"}
              </S.PurchaseButton>
            </S.ChestCard>
          ))}
        </S.ChestsGrid>
      ) : (
        <S.HistoryTable>
          <thead>
            <tr>
              <th>Data</th>
              <th>Baú</th>
              <th>Recompensa</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.purchase_history.map((purchase) => (
              <tr key={purchase.id}>
                <td>{new Date(purchase.purchased_at).toLocaleDateString()}</td>
                <td>{purchase.chest.title}</td>
                <td>
                  <S.RewardBadge rewardType={purchase.reward.reward_type}>
                    {getRewardIcon(purchase.reward.reward_type)}
                    {purchase.reward.name}
                  </S.RewardBadge>
                </td>
                <td>
                  <Coin size={16} />
                  {purchase.chest.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </S.HistoryTable>
      )}

      <AnimatePresence>
        {openedChest && (
          <S.ChestModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <S.ChestModalContent>
              <S.CloseButton onClick={closeOpenedChest}>
                <X size={24} />
              </S.CloseButton>

              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <S.OpenedChestImage src={IMAGES.openedChest} alt="Baú aberto" />
              </motion.div>

              <S.RewardContainer>
                <S.RewardTitle>Você encontrou:</S.RewardTitle>
                <S.RewardCard rewardType={openedChest.reward?.reward_type}>
                  {getRewardIcon(openedChest.reward?.reward_type)}
                  <div>
                    <h3>{openedChest.reward?.name}</h3>
                    <p>{openedChest.reward?.description}</p>
                  </div>
                </S.RewardCard>

                <S.ChestDetails>
                  <div>
                    <span>Baú:</span>
                    <strong>{openedChest.chest?.title}</strong>
                  </div>
                  <div>
                    <span>Valor:</span>
                    <strong>
                      <Coin size={16} />
                      {openedChest.chest?.value.toLocaleString()} Gold
                    </strong>
                  </div>
                </S.ChestDetails>
              </S.RewardContainer>
            </S.ChestModalContent>
          </S.ChestModal>
        )}
      </AnimatePresence>
    </S.StoreContainer>
  );
};
