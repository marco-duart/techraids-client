import React from "react";
import styled from "styled-components";
import { IChapter } from "../../services/chapter/DTO";
import { IGuildMember } from "../../services/character-quest/DTO";

interface ChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: IChapter.Model;
  members: IGuildMember.Model[];
}

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
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

const MembersSection = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 10px;
`;

const MemberImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
`;

const ChapterInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CloseButton = styled.button`
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

const ChapterModal: React.FC<ChapterModalProps> = ({
  isOpen,
  onClose,
  chapter,
  members,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
        <MembersSection>
          {members.map((member) => (
            <MemberImage
              key={member.nickname}
              src={member.character_class.image_url}
              alt={member.nickname}
            />
          ))}
        </MembersSection>
        <ChapterInfo>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
        </ChapterInfo>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChapterModal;