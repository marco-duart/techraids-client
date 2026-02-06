import { useMissions } from "../../../hooks";
import * as S from "./styles";
import { MissionTable } from "../../../components/tables/mission-table";
import { Pagination } from "../../../components/pagination";
import { MissionFilters } from "../../../components/mission-filters";
import { Scroll, Refresh } from "@styled-icons/fa-solid";

export const CharacterMissionsPage = () => {
  const {
    missions,
    pagy,
    isLoading,
    fetchMissions,
    setStatus,
    setGoldRewardRange,
    setSortBy,
    goToPage,
  } = useMissions();

  const handleRefresh = async () => {
    await fetchMissions();
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleContainer>
          <Scroll size={32} />
          <S.Title>Livro de Missões</S.Title>
        </S.TitleContainer>

        <S.ButtonsContainer>
          <S.RefreshIconButton
            onClick={handleRefresh}
            disabled={isLoading}
            title="Atualizar lista de missões"
          >
            <Refresh size={isLoading ? 16 : 18} />
            {isLoading && <S.LoadingSpinner />}
          </S.RefreshIconButton>
        </S.ButtonsContainer>
      </S.Header>

      <S.Content>
        <MissionFilters
          onStatusChange={setStatus}
          onRewardRangeChange={setGoldRewardRange}
          onSortChange={(sortBy, direction) =>
            setSortBy(
              sortBy as "status" | "gold_reward" | "created_at" | "updated_at",
              direction
            )
          }
        />

        <S.TableWrapper>
          <MissionTable missions={missions} isLoading={isLoading} />
        </S.TableWrapper>

        {pagy.pages > 1 && (
          <Pagination
            currentPage={pagy.page}
            totalPages={pagy.pages}
            onPageChange={goToPage}
            isLoading={isLoading}
          />
        )}
      </S.Content>
    </S.Container>
  );
};
