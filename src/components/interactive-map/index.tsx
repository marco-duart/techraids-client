import React, { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IMAGES } from "../../utils/constants";
import { IChapter } from "../../services/chapter/DTO";
import { IGuildMember } from "../../services/character-quest/DTO";
import { IUser } from "../../services/auth/DTO";
import * as S from "./styles";
import ChapterModal from "../chapter-modal";

interface Props {
  chapters: IChapter.Model[];
  guildMembers: IGuildMember.Model[];
  currentChapter: IChapter.Model;
  user: IUser.UserWithRelations | null;
}

const mapOriginalWidth = 2912;
const mapOriginalHeight = 1631;

const InteractiveMap: React.FC<Props> = ({
  chapters,
  guildMembers,
  currentChapter,
  user,
}) => {
  const [mapSize, setMapSize] = useState({ width: 1, height: 1 });
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedChapter, setSelectedChapter] = useState<IChapter.Model | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState<IChapter.Model | null>(
    null
  );

  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        const { width, height } = mapRef.current.getBoundingClientRect();
        setMapSize({ width, height });
      }
    };

    updateMapSize();
    window.addEventListener("resize", updateMapSize);
    return () => window.removeEventListener("resize", updateMapSize);
  }, []);

  const calculatePosition = (x: number, y: number) => ({
    left: `calc(${(x / mapOriginalWidth) * mapSize.width}px - 10px)`,
    top: `calc(${(y / mapOriginalHeight) * mapSize.height}px - 10px)`,
  });

  const handleChapterClick = (chapter: IChapter.Model) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const getChapterCharacters = (
    chapterId: number
  ): {
    user: IUser.UserWithRelations | undefined;
    guildMembers: IGuildMember.Model[] | undefined;
  } => {
    const guildMembersInChapter = guildMembers.filter(
      (member) => member.current_chapter.id === chapterId
    );

    const userInChapter =
      user && user.current_chapter_id === chapterId ? user : undefined;

    return {
      user: userInChapter,
      guildMembers:
        guildMembersInChapter.length > 0 ? guildMembersInChapter : undefined,
    };
  };

  const handleChapterHover = (chapter: IChapter.Model | null) => {
    setHoveredChapter(chapter);
  };

  return (
    <TransformWrapper initialScale={1} minScale={1} maxScale={3} centerOnInit>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <>
          <S.Controls>
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>⟲</button>
          </S.Controls>

          <TransformComponent>
            <S.MapContainer ref={mapRef}>
              <S.CloudsContainer>
                <S.CloudsImage src={IMAGES.clouds} alt="Nuvens" />
                <S.CloudsImage
                  src={IMAGES.clouds}
                  alt="Nuvens"
                  style={{ left: "50%" }}
                />
              </S.CloudsContainer>

              <S.MapImage src={IMAGES.questMap} alt="World Map" />

              {chapters.map((chapter) => {
                const membersInChapter = getChapterCharacters(chapter.id);
                const hasUser = (membersInChapter.user != undefined)!!;
                const hasMembers = (membersInChapter.guildMembers &&
                  membersInChapter.guildMembers.length > 0)!!;

                return (
                  <React.Fragment key={chapter.id}>
                    <S.ChapterPoint
                      style={calculatePosition(
                        chapter.position_x,
                        chapter.position_y
                      )}
                      $isCurrent={chapter.id === currentChapter.id}
                      $hasUser={hasUser}
                      $hasMembers={hasMembers}
                      onClick={() => handleChapterClick(chapter)}
                      onMouseEnter={() => handleChapterHover(chapter)}
                      onMouseLeave={() => handleChapterHover(null)}
                    >
                      <S.ChapterTooltip>{chapter.title}</S.ChapterTooltip>
                    </S.ChapterPoint>

                    {hoveredChapter?.id === chapter.id && (
                      <>
                        {hasUser && (
                          <S.CharacterPoint
                            style={calculatePosition(
                              chapter.position_x + 30,
                              chapter.position_y - 30
                            )}
                            $isUser
                          >
                            <img
                              src={user?.character_class.image_url}
                              alt={user?.nickname}
                            />
                          </S.CharacterPoint>
                        )}
                        {membersInChapter.guildMembers?.map((member, index) => (
                          <S.CharacterPoint
                            key={member.nickname}
                            style={calculatePosition(
                              chapter.position_x + (index + 1) * 30,
                              chapter.position_y + (index + 1) * 30
                            )}
                          >
                            <img
                              src={member.character_class.image_url}
                              alt={member.nickname}
                            />
                          </S.CharacterPoint>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </S.MapContainer>
          </TransformComponent>

          {selectedChapter && (
            <ChapterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              chapter={selectedChapter}
              members={getChapterCharacters(selectedChapter.id)}
            />
          )}
        </>
      )}
    </TransformWrapper>
  );
};

export default InteractiveMap;
