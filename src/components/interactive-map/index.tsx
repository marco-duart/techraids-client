import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IMAGES } from "../../utils/constants";
import { IChapter } from "../../services/chapter/DTO";
import { IGuildMember } from "../../services/character-quest/DTO";
import * as S from "./styles";

interface InteractiveMapProps {
  chapters: IChapter.Model[];
  guildMembers: IGuildMember.Model[];
  currentChapterId: number;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  chapters,
  guildMembers,
  currentChapterId,
}) => {
  return (
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={3}
      limitToBounds={true}
      centerOnInit={true}
      centerZoomedOut={true}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <S.Controls>
            <button onClick={() => zoomIn()}>Zoom In</button>
            <button onClick={() => zoomOut()}>Zoom Out</button>
            <button onClick={() => resetTransform()}>Reset</button>
          </S.Controls>
          <TransformComponent>
            <S.MapContainer>
              <S.MapImage src={IMAGES.questMap} alt="World Map" />
              {chapters.map((chapter) => (
                <React.Fragment key={chapter.id}>
                  <S.ChapterPoint
                    positionX={chapter.position_x}
                    positionY={chapter.position_y}
                    isCurrent={chapter.id === currentChapterId}
                  >
                    <S.ChapterTooltip>{chapter.title}</S.ChapterTooltip>
                  </S.ChapterPoint>
                  {guildMembers
                    .filter(
                      (member) => member.current_chapter.id === chapter.id
                    )
                    .map((member, index) => (
                      <S.GuildMemberPoint
                        key={member.nickname}
                        positionX={chapter.position_x + 30 * (index + 1)}
                        positionY={chapter.position_y}
                      >
                        <img
                          src={member.character_class.image_url}
                          alt={member.nickname}
                        />
                        <S.GuildMemberTooltip>
                          <h4>{member.nickname}</h4>
                          <p>{member.character_class.name}</p>
                          <p>Nível: {member.current_level}</p>
                        </S.GuildMemberTooltip>
                      </S.GuildMemberPoint>
                    ))}
                </React.Fragment>
              ))}
            </S.MapContainer>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};

export default InteractiveMap;