import styled from "styled-components";
import { motion } from "framer-motion";

export const SelectionContainer = styled.div`
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
  opacity: 0.4;
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

export const FooterNote = styled.p`
  text-align: center;
  margin-top: 3rem;
  font-style: italic;
  opacity: 0.7;
  font-size: 0.9rem;
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

export const ClassesShowcase = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const ClassCard = styled(motion.div)<{
  selected: boolean;
}>`
  width: 280px;
  background: ${({ theme, selected }) =>
    selected ? theme.accent + "10" : "#FFFFFF"};
  border: 3px solid
    ${({ theme, selected }) => (selected ? theme.accent : theme.border)};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

export const ClassImageContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const ClassImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;

  ${ClassCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ClassOverlay = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme, selected }) =>
    selected ? theme.accent + "30" : "rgba(0, 0, 0, 0.2)"};
  transition: all 0.3s ease;
`;

export const ClassInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

export const ClassName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textTitle};
`;

export const ClassSlogan = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.accent};
`;

export const ClassRequirements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;
