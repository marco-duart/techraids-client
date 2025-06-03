import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const CharacterPoint = styled(motion.div)<{ $isUser?: boolean }>`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ $isUser }) => ($isUser ? "#e67e22" : "#fff")};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const MapContainer = styled.div<{ $isLoading: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: ${({ $isLoading }) => ($isLoading ? 'none' : 'auto')};
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};
`;

export const MapImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
`;

export const ChapterPoint = styled.div<{
  $hasUser: boolean;
  $hasMembers: boolean;
}>`
  --point-size: 20px;
  position: absolute;
  width: var(--point-size);
  height: var(--point-size);
  border-radius: 50%;
  background: ${({ $hasUser }) =>
    $hasUser
      ? "linear-gradient(45deg,rgb(253, 135, 135),rgb(255, 193, 176))"
      : "linear-gradient(45deg,rgb(175, 161, 253),rgb(204, 194, 251))"};
  border: 2px solid
    ${({ $hasUser, $hasMembers }) =>
      $hasUser ? "#FF2E2E" : $hasMembers ? "#5F2DFF" : "transparent"};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const ChapterTooltip = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ChapterPoint}:hover & {
    opacity: 1;
  }
`;

export const Controls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  gap: 10px;

  button {
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;

    &:hover {
      background: #f0f0f0;
    }
  }
`;

const cloudAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const CloudsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  z-index: 1;
  opacity: 0.4;
  pointer-events: none;
`;

export const CloudsImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  animation: ${cloudAnimation} 60s linear infinite;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LoadingText = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-top: 1rem;
`;
