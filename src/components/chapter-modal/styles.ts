import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border: 2px solid #e67e22;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  color: white;
  display: flex;
  gap: 20px;
`;

export const MembersSection = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
`;

export const MemberImage = styled.img<{ $isUser?: boolean }>`
  width: 100px;
  height: 150px;
  border-radius: 8px;
  border: 2px solid ${({ $isUser }) => ($isUser ? "#e67e22" : "#fff")};
  object-fit: cover;
`;

export const ChapterInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e67e22;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;
