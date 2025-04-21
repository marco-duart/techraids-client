import { IMission } from "../../services/mission/DTO";
import * as S from "./styles";
import { StatusBadge } from "../status-badge";

interface Props {
  missions: IMission.Model[];
  isLoading?: boolean;
}

export const MissionTable = ({ missions, isLoading }: Props) => {
  return (
    <S.TableWrapper>
      {isLoading && <S.LoadingOverlay>Carregando Missões...</S.LoadingOverlay>}

      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeader>Missão</S.TableHeader>
            <S.TableHeader>Estado</S.TableHeader>
            <S.TableHeader>Recompensa</S.TableHeader>
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {missions.map((mission) => (
            <S.TableRow key={mission.id}>
              <S.TableCell>
                <S.QuestTitle>{mission.title}</S.QuestTitle>
                {mission.description && (
                  <S.QuestDescription>{mission.description}</S.QuestDescription>
                )}
              </S.TableCell>

              <S.TableCell>
                <StatusBadge status={mission.status} />
              </S.TableCell>

              <S.TableCell>
                <S.GoldCell>{mission.gold_reward || 0}</S.GoldCell>
              </S.TableCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>

      {!isLoading && missions.length === 0 && (
        <S.EmptyMessage>
          Nenhuma missão encontrada no grimório...
        </S.EmptyMessage>
      )}
    </S.TableWrapper>
  );
};
