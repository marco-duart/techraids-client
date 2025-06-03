import styled from "styled-components";
import { motion } from "framer-motion";
import { IMAGES } from "../../../utils/constants";

export const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 60px);
  overflow: hidden;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
  z-index: 1;
`;

export const QuestCard = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.primary};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 2;
  text-align: center;
`;

export const QuestTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.textTitle};
  margin-bottom: 1rem;
`;

export const QuestSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

export const TaskStatus = styled.div<{ $status: string }>`
  font-size: 1rem;
  color: ${({ theme, $status }) =>
    $status === "pending"
      ? theme.accent
      : $status === "accepted"
      ? theme.success
      : theme.error};
  margin-bottom: 1rem;
`;

export const MissionStatus = styled.div<{ $status: string }>`
  font-size: 1rem;
  color: ${({ theme, $status }) =>
    $status === "pending"
      ? theme.accent
      : $status === "accepted"
      ? theme.success
      : theme.error};
  margin-bottom: 1.5rem;
`;

export const StartButton = styled(motion.button)`
  background: ${({ theme }) => theme.emphasis};
  color: ${({ theme }) => theme.textTitle};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

export const ChallengeBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 1;
  background-image: url(${IMAGES.questMap});
  background-size: cover;
  background-position: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 40%,
      rgba(0, 0, 0, 0.9) 80%
    );
    pointer-events: none;
  }
`;

export const ChapterMarker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75px;
  height: 75px;
  background: black;
  border-radius: 50%;
  z-index: 2;
`;

export const CharacterAndGuildContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 3;
`;

export const CharacterCircle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  border: 3px solid ${({ theme }) => theme.accent};
  overflow: visible;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

export const CharacterTooltip = styled(motion.div)`
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.primary};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 4;
  display: none;
  min-width: 150px;
  text-align: center;

  ${CharacterCircle}:hover & {
    display: block;
  }
`;

export const GuildMembersContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const GuildMemberCircle = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.accent};
  overflow: visible;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

export const GuildMemberTooltip = styled(motion.div)`
  position: absolute;
  top: 70px; // Condicionar tooltip
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.primary};
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 4;
  display: none;
  min-width: 120px;
  text-align: center;

  ${GuildMemberCircle}:hover & {
    display: block;
  }
`;

export const PreviousChapterMembers = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
`;

export const NextChapterMembers = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
`;
