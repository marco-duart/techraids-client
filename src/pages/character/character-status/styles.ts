import styled from "styled-components";
import { motion } from "framer-motion";
import { ThemeMode } from "../../../assets/styles/theme";
import { IMAGES, DEVICE } from "../../../utils/constants";

export const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow: hidden;
  padding: 1rem;

  @media ${DEVICE.tablet} {
    padding-top: 2rem;
  }
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
  padding: 1rem;
  max-width: 100%;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: "MedievalSharp", cursive;

  @media ${DEVICE.tablet} {
    max-width: 800px;
    padding: 2rem;
    gap: 1.5rem;
  }
`;

export const CharacterFullBodyImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border: 4px solid ${({ theme }) => theme.emphasis};
  border-radius: 8px;
  margin-bottom: 1rem;

  @media ${DEVICE.tablet} {
    max-width: 300px;
  }
`;

export const CharacterTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  font-family: "MedievalSharp", cursive;
  text-decoration: underline;
  margin-bottom: 0.5rem;

  @media ${DEVICE.tablet} {
    font-size: 2.5rem;
  }
`;

export const CharacterSubtitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.accent};
  font-family: "MedievalSharp", cursive;
  margin-bottom: 1rem;

  @media ${DEVICE.tablet} {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const CharacterLevel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.emphasis};
  border: 4px solid ${({ theme }) => theme.accent};
  border-radius: 50%;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textTitle};
  font-family: "Arial", sans-serif;
  font-weight: bold;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 4;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 2px solid ${({ theme }) => theme.accent};
    border-radius: 50%;
    z-index: -1;
  }

  @media ${DEVICE.tablet} {
    top: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    font-size: 2rem;

    &::before {
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
    }
  }
`;

export const LevelText = styled.span`
  position: absolute;
  bottom: -20px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  font-family: "MedievalSharp", cursive;
  text-transform: uppercase;

  @media ${DEVICE.tablet} {
    bottom: -25px;
    font-size: 0.9rem;
  }
`;

export const CharacterInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${({ theme }) => theme.emphasis};
  border-radius: 8px;
  background: linear-gradient(
    145deg,
    rgba(94, 72, 55, 0.1) 0%,
    rgba(94, 72, 55, 0.2) 100%
  );

  @media ${DEVICE.tablet} {
    gap: 1rem;
    padding: 1rem;
  }
`;

export const CharacterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  @media ${DEVICE.tablet} {
    margin-bottom: 1rem;
  }
`;

export const CharacterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textTitle};
  font-weight: bold;

  @media ${DEVICE.tablet} {
    font-size: 1.2rem;
  }
`;

export const CharacterValue = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;

  @media ${DEVICE.tablet} {
    font-size: 1.2rem;
  }
`;

export const IconWrapper = styled.span`
  color: ${({ theme }) => theme.accent};
  font-size: 1.25rem;

  @media ${DEVICE.tablet} {
    font-size: 1.5rem;
  }
`;

export const DecorativeBorder = styled.div`
  width: 100%;
  height: 8px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.emphasis} 50%,
    transparent 100%
  );
  margin: 0.75rem 0;

  @media ${DEVICE.tablet} {
    height: 10px;
    margin: 1rem 0;
  }
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

export const ActiveTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ theme }) => theme.accent};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const ActiveTitleText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  text-transform: uppercase;
  letter-spacing: 1px;

  @media ${DEVICE.tablet} {
    font-size: 1.4rem;
  }
`;

export const ActiveTitleSlogan = styled.span`
  font-size: 0.9rem;
  font-style: italic;
  color: ${({ theme }) => theme.emphasis};

  @media ${DEVICE.tablet} {
    font-size: 1rem;
  }
`;

export const TitleSelectorContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;