import React, { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IMAGES } from "../../utils/constants";
import * as S from "./styles";
import ManagerModal from "../manager-modal";
import { IGetNarratorQuest } from "../../services/narrator-guild/DTO";

interface Props {
  chapters?: IGetNarratorQuest.ChapterWithCharactersAndBoss[];
  hints?: IGetNarratorQuest.Hints;
  guildResume?: IGetNarratorQuest.GuildResume;
  isLoading: boolean;
  onRefresh: () => void;
}

const mapOriginalWidth = 2912;
const mapOriginalHeight = 1631;

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value);

const ManagerMap: React.FC<Props> = ({
  chapters,
  hints,
  guildResume,
  isLoading,
  onRefresh,
}) => {
  const [mapSize, setMapSize] = useState({ width: 1, height: 1 });
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedChapter, setSelectedChapter] =
    useState<IGetNarratorQuest.ChapterWithCharactersAndBoss | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredChapter, setHoveredChapter] =
    useState<IGetNarratorQuest.ChapterWithCharactersAndBoss | null>(null);
  const [arePositionsReady, setArePositionsReady] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(true);

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

  useEffect(() => {
    if (chapters && chapters.length > 0) {
      const validChapters = chapters.filter(
        (chapter) => chapter.position_x > 0 && chapter.position_y > 0
      );
      setArePositionsReady(validChapters.length === chapters.length);

      if (validChapters.length === chapters.length && mapRef.current) {
        const { width, height } = mapRef.current.getBoundingClientRect();
        setMapSize({ width, height });
      }
    } else {
      setArePositionsReady(false);
    }
  }, [chapters]);

  const calculatePosition = (x: number, y: number) => ({
    left: `calc(${(x / mapOriginalWidth) * mapSize.width}px - 10px)`,
    top: `calc(${(y / mapOriginalHeight) * mapSize.height}px - 10px)`,
  });

  const handleChapterClick = (
    chapter: IGetNarratorQuest.ChapterWithCharactersAndBoss
  ) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const handleChapterHover = (
    chapter: IGetNarratorQuest.ChapterWithCharactersAndBoss | null
  ) => {
    setHoveredChapter(chapter);
  };

  const nextBoss = hints?.next_boss;

  return (
    <TransformWrapper initialScale={1} minScale={1} maxScale={3} centerOnInit>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <>
          {(isLoading || !arePositionsReady) && (
            <S.LoadingOverlay>
              <S.LoadingText>
                {isLoading ? "Carregando..." : "Posicionando no mapa..."}
              </S.LoadingText>
            </S.LoadingOverlay>
          )}

          <S.Controls>
            <button onClick={() => zoomIn()} title="Aproximar mapa">
              +
            </button>
            <button onClick={() => zoomOut()} title="Distanciar mapa">
              -
            </button>
            <button
              onClick={() => resetTransform()}
              title="Resetar posição do mapa"
            >
              ⟲
            </button>
            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Atualizar mapa"
            >
              🔄
            </button>
          </S.Controls>

          {hints && !isInsightsOpen && (
            <S.QuestInsightsToggle
              onClick={() => setIsInsightsOpen(true)}
              title="Mostrar Radar da Equipe"
            >
              Mostrar Radar
            </S.QuestInsightsToggle>
          )}

          {hints && isInsightsOpen && (
            <S.QuestInsightsPanel>
              <S.PanelHeader>
                <S.PanelTitle>Radar da Equipe</S.PanelTitle>
                <S.PanelToggleButton
                  onClick={() => setIsInsightsOpen(false)}
                  title="Esconder Radar da Equipe"
                >
                  Esconder
                </S.PanelToggleButton>
              </S.PanelHeader>
              <S.PanelLine>
                Janela: {hints.analysis_window_days} dias | Tarefas aprovadas: {" "}
                {hints.task_pace.approved_tasks_last_window}
              </S.PanelLine>
              <S.PanelLine>
                Ritmo: {formatNumber(hints.task_pace.approved_tasks_per_day)} tarefas/dia
              </S.PanelLine>
              <S.PanelLine>
                XP/tarefa: {formatNumber(hints.task_pace.average_xp_per_approved_task)} | XP/dia estimado: {" "}
                {formatNumber(hints.task_pace.estimated_team_xp_per_day)}
              </S.PanelLine>

              {guildResume && (
                <S.PanelLine>
                  Membros: {guildResume.total_members} | XP médio: {formatNumber(guildResume.average_xp)}
                </S.PanelLine>
              )}

              {nextBoss?.available ? (
                <>
                  <S.PanelDivider />
                  <S.PanelLine>
                    Próximo boss: {nextBoss.boss_name} ({nextBoss.chapter_title})
                  </S.PanelLine>
                  <S.PanelLine>
                    Time no capítulo: {nextBoss.team_members_on_chapter} | XP atual: {formatNumber(nextBoss.team_current_xp)}
                  </S.PanelLine>
                  <S.PanelLine>
                    XP necessária: {formatNumber(nextBoss.required_xp)} | Gap: {formatNumber(nextBoss.xp_gap)}
                  </S.PanelLine>
                  <S.PanelLine>
                    Pronto agora: {nextBoss.can_defeat_now ? "Sim" : "Não"}
                    {typeof nextBoss.estimated_days_to_defeat === "number"
                      ? ` | Estimativa: ${nextBoss.estimated_days_to_defeat} dias`
                      : ""}
                  </S.PanelLine>
                </>
              ) : (
                <>
                  <S.PanelDivider />
                  <S.PanelLine>{nextBoss?.message || "Sem boss disponível no momento."}</S.PanelLine>
                </>
              )}

              {hints.pacing_scenarios.length > 0 && (
                <>
                  <S.PanelDivider />
                  {hints.pacing_scenarios.map((scenario) => (
                    <S.PanelLine key={scenario.horizon_days}>
                      {scenario.horizon_days}d: {scenario.projected_approved_tasks} tarefas proj.
                      {typeof scenario.suggested_xp_per_task === "number"
                        ? ` | XP/tarefa sugerida: ${scenario.suggested_xp_per_task}`
                        : ""}
                    </S.PanelLine>
                  ))}
                </>
              )}

              {hints.recommendations.length > 0 && (
                <>
                  <S.PanelDivider />
                  <S.PanelLine>{hints.recommendations[0]}</S.PanelLine>
                </>
              )}
            </S.QuestInsightsPanel>
          )}

          <TransformComponent>
            <S.MapContainer
              ref={mapRef}
              $isLoading={isLoading || !arePositionsReady}
            >
              <S.CloudsContainer>
                <S.CloudsImage src={IMAGES.clouds} alt="Nuvens" />
                <S.CloudsImage
                  src={IMAGES.clouds}
                  alt="Nuvens"
                  style={{ left: "50%" }}
                />
              </S.CloudsContainer>

              <S.MapImage src={IMAGES.questMap} alt="World Map" />

              {arePositionsReady &&
                chapters?.map((chapter) => {
                  const hasMembers =
                    !!chapter.guild_members && chapter.guild_members.length > 0;

                  return (
                    <React.Fragment
                      key={`${chapter.id}-${chapter.position_x}-${chapter.position_y}`}
                    >
                      <S.ChapterPoint
                        style={calculatePosition(
                          chapter.position_x,
                          chapter.position_y
                        )}
                        $hasMembers={hasMembers}
                        onClick={() => handleChapterClick(chapter)}
                        onMouseEnter={() => handleChapterHover(chapter)}
                        onMouseLeave={() => handleChapterHover(null)}
                      >
                        <S.ChapterTooltip>{chapter.title}</S.ChapterTooltip>
                      </S.ChapterPoint>

                      {hoveredChapter?.id === chapter.id && (
                        <>
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
            <ManagerModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              chapter={selectedChapter}
              hints={hints}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </TransformWrapper>
  );
};

export default ManagerMap;
