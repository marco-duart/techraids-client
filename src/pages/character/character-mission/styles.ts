import styled from "styled-components";
import { motion } from "framer-motion";
import { DEVICE } from "../../../utils/constants";

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow: hidden;
  padding: 1rem;
  gap: 1.5rem;
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );

  @media ${DEVICE.tablet} {
    padding: 2rem;
  }
`;

export const Content = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
  background-color: ${({ theme }) => theme.secondary}90;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const TableWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.primary};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 3;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-family: "MedievalSharp", cursive;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.textTitle};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin: 0;
  letter-spacing: 1px;

  @media ${DEVICE.tablet} {
    font-size: 2.2rem;
  }
`;

export const FormModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 1rem;
  backdrop-filter: blur(3px);
`;

export const FormContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.secondary};
  border: 3px solid ${({ theme }) => theme.border};
  border-radius: 0;
  padding: 2rem;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.accent};
    border-radius: 4px;
  }

  @media ${DEVICE.tablet} {
    padding: 3rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    color: ${({ theme }) => theme.accent};
    background-color: ${({ theme }) => theme.primary}20;
  }
`;
