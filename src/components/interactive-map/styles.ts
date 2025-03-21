import styled from "styled-components";
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

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MapImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
`;

export const ChapterPoint = styled.div<{
  $isCurrent: boolean;
  $hasUser: boolean;
  $hasMembers: boolean;
}>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $isCurrent }) =>
    $isCurrent
      ? "linear-gradient(45deg, #ff9a9e, #fad0c4)"
      : "linear-gradient(45deg, #a1c4fd, #c2e9fb)"};
  border: 2px solid
    ${({ $hasUser, $hasMembers }) =>
      $hasUser ? "#e67e22" : $hasMembers ? "#4caf50" : "transparent"};
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