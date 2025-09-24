import styled from "styled-components";

export const RankingContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 2rem;
  overflow-x: hidden;
  font-family: "MedievalSharp", cursive;
  color: ${({ theme }) => theme.text};
`;

export const TitleContainer = styled.div`
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
  position: relative;
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

export const RankingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const RankingCard = styled.div`
  background: ${({ theme }) => theme.secondary};
  border: 3px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3),
    inset 0 0 10px ${({ theme }) => theme.primary}40;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.accent},
      ${({ theme }) => theme.accent}80,
      transparent
    );
  }

  &:hover {
    transform: translateY(-5px) rotate(1deg);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4),
      inset 0 0 15px ${({ theme }) => theme.primary}60,
      0 0 15px ${({ theme }) => theme.accent}80;
  }
`;

export const RefreshIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.accent};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.textTitle};
    border-color: ${({ theme }) => theme.accent};
    transform: translateY(-50%) scale(1.1) rotate(90deg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(-50%) scale(1) rotate(90deg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    margin: 0 auto 1rem;
    
    &:hover:not(:disabled) {
      transform: scale(1.1) rotate(90deg);
    }
    
    &:active:not(:disabled) {
      transform: scale(1) rotate(90deg);
    }
  }
`;

export const LoadingSpinner = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const RankingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed ${({ theme }) => theme.border};

  svg {
    color: ${({ theme }) => theme.accent};
    flex-shrink: 0;
  }
`;

export const RankingTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.textTitle};
`;

export const RankingSubtitle = styled.p`
  font-size: 0.9rem;
  margin: 0.25rem 0 0;
  font-style: italic;
  opacity: 0.8;
`;

export const RankingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const RankingItem = styled.li`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border}30;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(1) {
    .crown-icon {
      color: gold;
      filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.7));
    }
  }

  &:nth-child(2) {
    .crown-icon {
      color: silver;
      filter: drop-shadow(0 0 2px rgba(192, 192, 192, 0.7));
    }
  }

  &:nth-child(3) {
    .crown-icon {
      color: #cd7f32;
      filter: drop-shadow(0 0 2px rgba(205, 127, 50, 0.7));
    }
  }
`;

export const RankPosition = styled.div`
  &:nth-child(1) {
    animation: pulse-gold 2s infinite;
  }
  &:nth-child(2) {
    animation: pulse-silver 3s infinite;
  }
  &:nth-child(3) {
    animation: pulse-bronze 4s infinite;
  }

  @keyframes pulse-gold {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
      color: gold;
    }
  }
  @keyframes pulse-silver {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
      color: silver;
    }
  }
  @keyframes pulse-bronze {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
      color: #cd7f32;
    }
  }
`;

export const RankIcon = styled.div`
  svg {
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    width: 20px;
  }
`;

export const RankName = styled.span`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RankValue = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  font-family: "Literata", serif;
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  font-family: "MedievalSharp", cursive;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}20;
  }

  svg {
    width: 16px;
  }
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

export const FloatingParticles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;

  div {
    position: absolute;
    font-size: 1.5rem;
    opacity: 0.7;
    filter: drop-shadow(0 0 2px ${({ theme }) => theme.accent});
    
    &:nth-child(1) { top: 10%; left: 5%; }
    &:nth-child(2) { top: 25%; left: 30%; }
    &:nth-child(3) { top: 15%; left: 70%; }
    &:nth-child(4) { top: 50%; left: 10%; }
    &:nth-child(5) { top: 60%; left: 80%; }
    &:nth-child(6) { top: 75%; left: 25%; }
    &:nth-child(7) { top: 85%; left: 60%; }
    &:nth-child(8) { top: 35%; left: 50%; }
    &:nth-child(9) { top: 45%; left: 85%; }
    &:nth-child(10) { top: 70%; left: 45%; }
  }
`;
