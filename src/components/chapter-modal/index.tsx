import React from "react";
import * as S from "./styles";
import { IChapter } from "../../services/chapter/DTO";
import { IGuildMember } from "../../services/character-quest/DTO";
import { IUser } from "../../services/auth/DTO";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chapter: IChapter.Model;
  members: {
    user: IUser.UserWithRelations | undefined;
    guildMembers: IGuildMember.Model[] | undefined;
  };
}

const ChapterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  chapter,
  members,
}) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>Fechar</S.CloseButton>
        <S.MembersSection>
          {members.user && (
            <S.MemberImage
              key={members.user.nickname}
              src={members.user.character_class.image_url}
              alt={members.user.nickname}
              $isUser
            />
          )}

          {members.guildMembers?.map((member) => (
            <S.MemberImage
              key={member.nickname}
              src={member.character_class.image_url}
              alt={member.nickname}
            />
          ))}
        </S.MembersSection>
        <S.ChapterInfo>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
        </S.ChapterInfo>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ChapterModal;
