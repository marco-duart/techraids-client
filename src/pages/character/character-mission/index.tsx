import { useMissions } from "../../../hooks";
import * as S from "./styles";
import { MissionTable } from "../../../components/tables/mission-table";
import { Scroll, Refresh } from "@styled-icons/fa-solid";

export const CharacterMissionsPage = () => {
  const { missions, isLoading, fetchMissions } = useMissions();

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
        <S.TableWrapper>
          <MissionTable missions={missions} isLoading={isLoading} />
        </S.TableWrapper>
      </S.Content>
    </S.Container>
  );
};
