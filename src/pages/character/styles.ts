import styled from "styled-components";
import { motion } from "framer-motion";
import { ThemeMode } from "../../assets/styles/theme";
import { IMAGES } from "../../utils/constants";

export const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow: hidden;
  padding-top: 2rem;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

export const FireAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 69, 0, 0) 0%,
    rgba(255, 69, 0, 0.8) 50%,
    rgba(255, 69, 0, 0) 100%
  );
  z-index: 2;
  opacity: 0.5;
  animation: fire 3s infinite;
`;

export const CharacterSheet = styled.div<{ themeMode: ThemeMode }>`
  position: relative;
  z-index: 3;
  background: ${({ themeMode }) =>
    themeMode === "light"
      ? `url(${IMAGES.paperTextureLight})`
      : `url(${IMAGES.paperTextureDark})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  font-family: "MedievalSharp", cursive;
`;

export const CharacterFullBodyImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border: 4px solid ${({ theme }) => theme.emphasis};
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const CharacterTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  font-family: "MedievalSharp", cursive;
  text-decoration: underline;
  margin-bottom: 0.5rem;
`;

export const CharacterSubtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.accent};
  font-family: "MedievalSharp", cursive;
  margin-bottom: 1.5rem;
`;

export const CharacterLevel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.emphasis};
  border: 4px solid ${({ theme }) => theme.accent};
  border-radius: 50%;
  font-size: 2rem;
  color: ${({ theme }) => theme.textTitle};
  font-family: "Arial", sans-serif;
  font-weight: bold;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 4;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 2px solid ${({ theme }) => theme.accent};
    border-radius: 50%;
    z-index: -1;
  }
`;

export const LevelText = styled.span`
  position: absolute;
  bottom: -25px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  font-family: "MedievalSharp", cursive;
  text-transform: uppercase;
`;

export const CharacterInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.emphasis};
  border-radius: 8px;
  background: linear-gradient(
    145deg,
    rgba(94, 72, 55, 0.1) 0%,
    rgba(94, 72, 55, 0.2) 100%
  );
`;

export const CharacterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const CharacterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textTitle};
  font-weight: bold;
`;

export const CharacterValue = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

export const IconWrapper = styled.span`
  color: ${({ theme }) => theme.accent};
  font-size: 1.5rem;
`;

export const DecorativeBorder = styled.div`
  width: 100%;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.emphasis} 50%,
    transparent 100%
  );
  margin: 1rem 0;
`;

export const DecorativeLine = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.emphasis} 50%,
    transparent 100%
  );
  margin: 0.5rem 0;
`;
