import React, { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IMAGES } from "../../utils/constants";
import { IChapter } from "../../services/chapter/DTO";
import { IGuildMember } from "../../services/character-quest/DTO";
import { IUser } from "../../services/auth/DTO";
import * as S from "./styles";
import ChapterModal from "./chapter-modal";

interface InteractiveMapProps {
  chapters: IChapter.Model[];
  guildMembers: IGuildMember.Model[];
  currentChapter: IChapter.Model;
  user: IUser.UserWithRelations | null;
}

const mapOriginalWidth = 2912;
const mapOriginalHeight = 1632;

const InteractiveMap: React.FC<InteractiveMapProps> = ({
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
    left: `${(x / mapOriginalWidth) * mapSize.width}px`,
    top: `${(y / mapOriginalHeight) * mapSize.height}px`,
  });

  const handleChapterClick = (chapter: IChapter.Model) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const getChapterMembers = (chapterId: number) => {
    return guildMembers.filter(
      (member) => member.current_chapter.id === chapterId
    );
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
              <S.MapImage src={IMAGES.questMap} alt="World Map" />

              {chapters.map((chapter) => {
                const membersInChapter = getChapterMembers(chapter.id);
                const hasUser =
                  user && chapter.id === currentChapter.id || false;
                const hasMembers = membersInChapter.length > 0;

                return (
                  <S.ChapterPoint
                    key={chapter.id}
                    style={calculatePosition(
                      chapter.position_x,
                      chapter.position_y
                    )}
                    $isCurrent={chapter.id === currentChapter.id}
                    $hasUser={hasUser}
                    $hasMembers={hasMembers}
                    onClick={() => handleChapterClick(chapter)}
                  >
                    <S.ChapterTooltip>{chapter.title}</S.ChapterTooltip>
                  </S.ChapterPoint>
                );
              })}
            </S.MapContainer>
          </TransformComponent>

          {selectedChapter && (
            <ChapterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              chapter={selectedChapter}
              members={getChapterMembers(selectedChapter.id)}
            />
          )}
        </>
      )}
    </TransformWrapper>
  );
};

export default InteractiveMap;