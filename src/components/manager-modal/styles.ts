import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.primary};
  border: 3px solid ${({ theme }) => theme.accent};
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  color: ${({ theme }) => theme.text};
  position: relative;
  box-shadow: 0 0 30px ${({ theme }) => theme.accent}80;
  font-family: "MedievalSharp", cursive;
  z-index: 10001;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.accent},
      transparent
    );
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.accent};
  border: none;
  color: ${({ theme }) => theme.textTitle};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: "MedievalSharp", cursive;
  font-weight: bold;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  }
`;

export const ChapterHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.accent},
      transparent
    );
  }
`;

export const ChapterTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.accent};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;

  &::before, &::after {
    content: "✧";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.accent};
  }

  &::before {
    left: -2rem;
  }

  &::after {
    right: -2rem;
  }
`;

export const ChapterSubtitle = styled.p`
  font-style: italic;
  font-size: 1.2rem;
  opacity: 0.9;
`;

export const ChapterDescription = styled(motion.div)`
  font-family: "Literata", serif;
  line-height: 1.6;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.primary}20;
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.accent};
  position: relative;
  overflow: hidden;

  h3 {
    color: ${({ theme }) => theme.accent};
  }
  
  strong {
    color: ${({ theme }) => theme.accent};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: url('https://www.transparenttextures.com/patterns/parchment.png');
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const BattleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
  min-height: 400px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 1rem;
  width: 100%;

  &:last-child {
    margin-bottom: 80px;
  }
`;

export const TeamMembersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border}40;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary}10;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.primary}20;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.accent};
    border-radius: 4px;
  }
`;

export const TeamTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: ${({ theme }) => theme.accent};
  font-size: 1.3rem;
  width: 100%;
  text-align: center;
  justify-content: center;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.accent}40;
`;

export const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

export const MemberCard = styled(motion.div)`
  width: 120px;
  background: ${({ theme }) => theme.primary + '10'};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05); 
  }

  &:nth-child(odd) {
    transform: rotate(-2deg);
  }
  &:nth-child(even) {
    transform: rotate(2deg);
  }
`;

export const MemberImage = styled.div`
  width: 80px;
  height: 120px;
  border-radius: 4px;
  background-color: #FFFFFF;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.border};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: top center;
  }
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const GlobalTooltip = styled.div<{ $visible: boolean; $x: number; $y: number }>`
  position: fixed;
  left: ${props => props.$x}px;
  top: ${props => props.$y - 10}px;
  transform: translateX(-50%) translateY(-100%);
  width: 200px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  text-align: center;
  border-radius: 6px;
  padding: 0.8rem;
  z-index: 10000;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease;
  border: 2px solid ${({ theme }) => theme.accent};
  font-family: "MedievalSharp", cursive;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.accent} transparent transparent transparent;
  }
`;

export const TooltipTitle = styled.h4`
  margin: 0 0 0.3rem 0;
  color: ${({ theme }) => theme.accent};
  font-size: 1rem;
`;

export const TooltipText = styled.p`
  margin: 0.2rem 0;
  font-size: 0.8rem;
  opacity: 0.9;
`;

export const VSContainer = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  text-shadow: 0 0 10px ${({ theme }) => theme.accent};
  margin: 1rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before, &::after {
    content: "";
    height: 2px;
    width: 50px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.accent},
      transparent
    );
    margin: 0 1rem;
  }
`;

export const BossContainer = styled(motion.div)<{ $defeated?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
  background: ${({ theme }) => theme.secondary}80;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  
  ${({ $defeated }) => $defeated && `
    &::after {
      content: "✘";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5rem;
      color: #ff0000;
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
      z-index: 3;
      opacity: 0.8;
    }
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 2;
      border-radius: 8px;
    }
  `}
`;

export const BossImage = styled.div<{ $defeated?: boolean }>`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  border: 3px solid ${({ theme, $defeated }) => 
    $defeated ? '#ff0000' : theme.accent};
  box-shadow: 0 0 20px ${({ theme, $defeated }) => 
    $defeated ? 'rgba(255, 0, 0, 0.8)' : theme.accent + '80'};
  position: relative;
  background: #FEFEFE;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    padding: 10px;
    filter: ${({ $defeated }) => $defeated ? 'grayscale(80%)' : 'none'};
  }
`;

export const BossName = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.accent};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  margin: 0;
`;

export const BossDescription = styled.p`
  max-width: 500px;
  text-align: center;
  font-family: "Literata", serif;
`;

export const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-style: italic;
`;

export const StateSwitchButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.accent};
  border: none;
  color: ${({ theme }) => theme.textTitle};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: "MedievalSharp", cursive;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  }
`;

export const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  div {
    position: absolute;
    font-size: 1.5rem;
    opacity: 0.7;
    filter: drop-shadow(0 0 2px ${({ theme }) => theme.accent});
    animation: float 15s linear infinite;

    &:nth-child(1) {
      top: 10%;
      left: 5%;
      animation-delay: 0s;
    }
    &:nth-child(2) {
      top: 25%;
      left: 30%;
      animation-delay: 2s;
    }
    &:nth-child(3) {
      top: 15%;
      left: 70%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      top: 50%;
      left: 10%;
      animation-delay: 6s;
    }
    &:nth-child(5) {
      top: 60%;
      left: 80%;
      animation-delay: 8s;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
    }
  }
`;

export const VictoryContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.mode === 'dark' ? '#2a2a2a' : '#f8f9fa'};
  border-radius: 8px;
  border-left: 4px solid gold;
  text-align: center;
`;

export const VictoryBadge = styled.div`
  font-size: 1.2rem;
  color: gold;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
`;

export const HeroImage = styled.div`
  width: 80px;
  height: 120px;
  margin: 0.5rem auto;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid gold;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    object-position: top center;
  }
`;

export const VictoryText = styled.div`
  color: #ff0000;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 0.5rem;
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
`;