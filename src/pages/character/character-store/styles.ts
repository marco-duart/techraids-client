import styled from "styled-components";
import { motion } from "framer-motion";
import { IReward } from "../../../services/rewards/DTO";

export const StoreContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 2rem;
  overflow-x: hidden;
  font-family: "MedievalSharp", cursive;
  color: ${({ theme }) => theme.text};
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.3;
`;

export const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 1rem;
  background: linear-gradient(
    to right,
    transparent,
    ${({ theme }) => theme.primary}80,
    transparent
  );
  border-bottom: 2px solid ${({ theme }) => theme.accent};
  border-top: 2px solid ${({ theme }) => theme.accent};
`;

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.accent};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
`;

export const MainSubtitle = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

export const GoldDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.accent};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ theme, $active }) =>
    $active ? theme.accent : theme.secondary};
  border: 2px solid
    ${({ theme, $active }) => ($active ? theme.accent : theme.border)};
  color: ${({ theme, $active }) => ($active ? theme.textTitle : theme.text)};
  border-radius: 4px;
  font-family: "MedievalSharp", cursive;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const ChestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ChestCard = styled.div`
  background: ${({ theme }) => theme.secondary};
  border: 3px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

export const ChestImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
`;

export const ChestInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ChestTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textTitle};
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const ChestValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1rem;
`;

export const ChestRewards = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;

  span {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

export const PurchaseButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.textTitle};
  font-family: "MedievalSharp", cursive;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.border};
  }
`;

export const HistoryTable = styled.table`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0;
  background: ${({ theme }) => theme.secondary};
  border: 3px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  th {
    background: ${({ theme }) => theme.primary}80;
    color: ${({ theme }) => theme.textTitle};
    font-weight: bold;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background: ${({ theme }) => theme.primary}20;
  }
`;

export const RewardBadge = styled.div<{ rewardType: IReward.RewardType }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: ${({ rewardType, theme }) => {
    switch (rewardType) {
      case IReward.RewardType.PHYSICAL:
        return theme.accent + "40";
      case IReward.RewardType.DIGITAL:
        return "#9c27b040";
      case IReward.RewardType.INGAME:
        return "#4caf5040";
      default:
        return "#ff980040";
    }
  }};
  border-radius: 4px;
`;

export const ChestModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const ChestModalContent = styled.div`
  position: relative;
  background: ${({ theme }) => theme.secondary};
  border: 3px solid ${({ theme }) => theme.accent};
  border-radius: 8px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 0 20px ${({ theme }) => theme.accent}80;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}20;
    transform: rotate(90deg);
  }
`;

export const OpenedChestImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  filter: drop-shadow(0 0 10px ${({ theme }) => theme.accent}80);
`;

export const RewardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const RewardTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.accent};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`;

export const RewardCard = styled.div<{ rewardType: IReward.RewardType | undefined }>`
  width: 100%;
  padding: 1.5rem;
  background: ${({ rewardType, theme }) => {
    switch (rewardType) {
      case IReward.RewardType.PHYSICAL:
        return theme.accent + "20";
      case IReward.RewardType.DIGITAL:
        return "#9c27b020";
      case IReward.RewardType.INGAME:
        return "#4caf5020";
      default:
        return "#ff980020";
    }
  }};
  border: 2px solid
    ${({ rewardType, theme }) => {
      switch (rewardType) {
        case IReward.RewardType.PHYSICAL:
          return theme.accent;
        case IReward.RewardType.DIGITAL:
          return "#9c27b0";
        case IReward.RewardType.INGAME:
          return "#4caf50";
        default:
          return "#ff9800";
      }
    }};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1.5rem;
    margin: 0;
    color: ${({ theme }) => theme.textTitle};
  }

  p {
    margin: 0.5rem 0 0;
    font-family: "Book Antiqua", serif;
  }
`;

export const ChestDetails = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    span {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    strong {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.accent};
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;

  .sword-spin {
    animation: spin 1.5s linear infinite;
    color: ${({ theme }) => theme.accent};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
