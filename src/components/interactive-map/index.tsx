import React, { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IMAGES } from "../../utils/constants";
import { IChapter } from "../../services/chapter/DTO";
import { IGuildMember } from "../../services/character-quest/DTO";
import { IUser } from "../../services/auth/DTO";
import * as S from "./styles";

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
  const [hoveredMember, setHoveredMember] = useState<IGuildMember.Model | null>(
    null
  );
  const [hoveredUser, setHoveredUser] = useState(false);
  const [cardPosition, setCardPosition] = useState({ left: 0, top: 0 });

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

  const handleMouseEnter = (
    event: React.MouseEvent,
    member: IGuildMember.Model | null
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCardPosition({
      left: rect.left + rect.width / 2,
      top: rect.top,
    });
    member ? setHoveredMember(member) : setHoveredUser(true);
  };

  const handleMouseLeave = () => {
    setHoveredMember(null);
    setHoveredUser(false);
  };

  const renderCharacterCard = () => {
    const character = hoveredMember || user;
    if (!character) return null;

    return (
      <S.CharacterCard
        style={{
          left: `${cardPosition.left}px`,
          top: `${cardPosition.top}px`,
          transform: "translate(-50%, -100%)",
        }}
      >
        <img
          src={character.character_class.image_url}
          alt={character.nickname}
        />
        <h4>{character.nickname}</h4>
        <p>Título: {character.active_title?.title}</p>
        <p>{character.character_class.name}</p>
        <p>Nível: {character.current_level}</p>
        <p>Experiência: {character.experience}</p>
      </S.CharacterCard>
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

              {chapters.map((chapter) => (
                <S.ChapterPoint
                  key={chapter.id}
                  style={calculatePosition(
                    chapter.position_x,
                    chapter.position_y
                  )}
                  $isCurrent={chapter.id === currentChapter.id}
                >
                  <S.ChapterTooltip>{chapter.title}</S.ChapterTooltip>
                </S.ChapterPoint>
              ))}

              {user && (
                <S.CharacterPoint
                  style={calculatePosition(
                    currentChapter.position_x,
                    currentChapter.position_y
                  )}
                  onMouseEnter={(e) => handleMouseEnter(e, null)}
                  onMouseLeave={handleMouseLeave}
                  $isUser
                >
                  <img
                    src={user.character_class.image_url}
                    alt={user.nickname}
                  />
                </S.CharacterPoint>
              )}

              {guildMembers.map((member, index) => (
                <S.CharacterPoint
                  key={member.nickname}
                  style={calculatePosition(
                    member.current_chapter.position_x + index * 20,
                    member.current_chapter.position_y
                  )}
                  onMouseEnter={(e) => handleMouseEnter(e, member)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={member.character_class.image_url}
                    alt={member.nickname}
                  />
                </S.CharacterPoint>
              ))}

              {(hoveredMember || hoveredUser) && renderCharacterCard()}
            </S.MapContainer>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};

export default InteractiveMap;
