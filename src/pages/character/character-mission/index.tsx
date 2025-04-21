import { useMissions } from "../../../hooks";
import * as S from "./styles";
import { MissionTable } from "../../../components/tables/mission-table";
import { Scroll } from "@styled-icons/fa-solid";

export const CharacterMissionsPage = () => {
  const { missions, isLoading } = useMissions();

  return (
    <S.Container>
      <S.Header>
        <S.TitleContainer>
          <Scroll size={32} />
          <S.Title>Livro de Missões</S.Title>
        </S.TitleContainer>
      </S.Header>

      <S.Content>
        <S.TableWrapper>
          <MissionTable missions={missions} isLoading={isLoading} />
        </S.TableWrapper>
      </S.Content>
    </S.Container>
  );
};
