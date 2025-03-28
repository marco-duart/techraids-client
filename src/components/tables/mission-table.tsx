import { IMission } from "../../services/mission/DTO";
import * as S from "./styles";
import { StatusBadge } from "../status-badge";
import { IconButton } from "../buttons/icon-button";
import { Edit, Trash } from "@styled-icons/boxicons-regular";

interface Props {
  missions: IMission.Model[];
  onEdit?: (mission: IMission.Model) => void;
  onDelete?: (id: number) => void;
  isLoading?: boolean;
}

export const MissionTable = ({
  missions,
  onEdit,
  onDelete,
  isLoading,
}: Props) => {
  return (
    <S.TableWrapper>
      {isLoading && <S.LoadingOverlay>Carregando Missões...</S.LoadingOverlay>}

      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeader>Missão</S.TableHeader>
            <S.TableHeader>Estado</S.TableHeader>
            <S.TableHeader>Recompensa</S.TableHeader>
            {(onEdit || onDelete) && <S.TableHeader>Ações</S.TableHeader>}
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

              {(onEdit || onDelete) && (
                <S.TableCell>
                  <S.ActionsCell>
                    {onEdit && (
                      <IconButton
                        icon={Edit}
                        onClick={() => onEdit(mission)}
                        size="md"
                        variant="default"
                        ariaLabel={`Editar ${mission.title}`}
                      />
                    )}
                    {onDelete && (
                      <IconButton
                        icon={Trash}
                        onClick={() => onDelete(mission.id)}
                        size="md"
                        variant="danger"
                        ariaLabel={`Excluir ${mission.title}`}
                      />
                    )}
                  </S.ActionsCell>
                </S.TableCell>
              )}
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
