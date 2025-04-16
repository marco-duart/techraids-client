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

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SpecializationCard = styled(motion.div)<{
  themeMode: string;
  selected: boolean;
}>`
  background: ${({ theme, selected }) =>
    selected ? theme.accent + "20" : theme.secondary};
  border: 3px solid
    ${({ theme, selected }) => (selected ? theme.accent : theme.border)};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme, selected }) =>
      selected ? theme.accent : "transparent"};
  }
`;

export const SpecIcon = styled.div`
  margin-bottom: 1rem;
  svg {
    color: ${({ theme }) => theme.accent};
    filter: drop-shadow(0 0 5px ${({ theme }) => theme.accent}80);
  }
`;

export const SpecTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textTitle};
`;

export const SpecDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  font-family: "Book Antiqua", serif;
`;

export const SelectButton = styled.div<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ theme, selected }) =>
    selected ? theme.accent : theme.primary}20;
  border: 1px solid
    ${({ theme, selected }) => (selected ? theme.accent : theme.border)};
  border-radius: 4px;
  display: inline-block;
  transition: all 0.3s ease;
`;
