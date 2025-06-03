import React, { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IMAGES } from "../../utils/constants";
import { IUser } from "../../services/auth/DTO";
import * as S from "./styles";
import ChapterModal from "../chapter-modal";
import { IGetCharacterQuest } from "../../services/character-quest/DTO";

interface Props {
  user: IUser.UserWithRelations | null;
  chapters?: IGetCharacterQuest.ChapterWithCharactersAndBoss[];
  isLoading: boolean;
  onProgressChapter: () => Promise<{ success: boolean }>;
  onDefeatBoss: () => Promise<{ success: boolean }>;
}

const mapOriginalWidth = 2912;
const mapOriginalHeight = 1631;

const InteractiveMap: React.FC<Props> = ({
  user,
  chapters,
  isLoading,
  onProgressChapter,
  onDefeatBoss,
}) => {
  const [mapSize, setMapSize] = useState({ width: 1, height: 1 });
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedChapter, setSelectedChapter] =
    useState<IGetCharacterQuest.ChapterWithCharactersAndBoss | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredChapter, setHoveredChapter] =
    useState<IGetCharacterQuest.ChapterWithCharactersAndBoss | null>(null);

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

  const handleChapterClick = (
    chapter: IGetCharacterQuest.ChapterWithCharactersAndBoss
  ) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const handleChapterHover = (
    chapter: IGetCharacterQuest.ChapterWithCharactersAndBoss | null
  ) => {
    setHoveredChapter(chapter);
  };

  const handleProgressChapter = async () => {
    setIsModalOpen(false);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return await onProgressChapter();
  };

  const handleDefeatBoss = async () => {
    setIsModalOpen(false);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return await onDefeatBoss();
  };

  return (
    <TransformWrapper initialScale={1} minScale={1} maxScale={3} centerOnInit>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <>
          {isLoading && (
            <S.LoadingOverlay>
              <S.LoadingText>Carregando...</S.LoadingText>
            </S.LoadingOverlay>
          )}

          <S.Controls>
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>⟲</button>
          </S.Controls>

          <TransformComponent>
            <S.MapContainer ref={mapRef} $isLoading={isLoading}>
              <S.CloudsContainer>
                <S.CloudsImage src={IMAGES.clouds} alt="Nuvens" />
                <S.CloudsImage
                  src={IMAGES.clouds}
                  alt="Nuvens"
                  style={{ left: "50%" }}
                />
              </S.CloudsContainer>

              <S.MapImage src={IMAGES.questMap} alt="World Map" />

              {chapters?.map((chapter) => {
                const hasUser = chapter.is_hero_chapter;
                const hasMembers =
                  !!chapter.guild_members && chapter.guild_members.length > 0;

                return (
                  <React.Fragment key={chapter.id}>
                    <S.ChapterPoint
                      style={calculatePosition(
                        chapter.position_x,
                        chapter.position_y
                      )}
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
                              src={chapter.character?.character_class.image_url}
                              alt={chapter.character?.nickname}
                            />
                          </S.CharacterPoint>
                        )}
                        {chapter.guild_members?.map((member, index) => (
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
              onDefeatBoss={handleDefeatBoss}
              onProgressChapter={handleProgressChapter}
              isLoading={isLoading}
              currentExperience={user?.experience || 0}
            />
          )}
        </>
      )}
    </TransformWrapper>
  );
};

export default InteractiveMap;
