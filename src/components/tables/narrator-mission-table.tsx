import * as S from "./styles";
import { IMission } from "../../services/mission/DTO";
import { StatusBadge } from "../status-badge";
import { IconButton } from "../buttons/icon-button";
import { Edit, Eye } from "@styled-icons/fa-regular";
import { Trash } from "@styled-icons/boxicons-regular";

interface Props {
  missions: IMission.Model[];
  onEdit: (mission: IMission.Model) => void;
  onDelete: (id: number) => void;
  onView: (mission: IMission.Model) => void;
}

export const NarratorMissionTable = ({
  missions,
  onEdit,
  onDelete,
  onView,
}: Props) => {
  return (
    <S.TableWrapper>
      <S.Table>
        <S.TableHead>
          <tr>
            <S.TableHeader>Título</S.TableHeader>
            <S.TableHeader>Status</S.TableHeader>
            <S.TableHeader>Recompensa</S.TableHeader>
            <S.TableHeader>Ações</S.TableHeader>
          </tr>
        </S.TableHead>
        <S.TableBody>
          {missions.length > 0 ? (
            missions.map((mission) => (
              <S.TableRow key={mission.id}>
                <S.TableCell>
                  <S.QuestTitle>{mission.title}</S.QuestTitle>
                  <S.QuestDescription>
                    {mission.description.substring(0, 60)}...
                  </S.QuestDescription>
                </S.TableCell>
                <S.TableCell>
                  <StatusBadge status={mission.status} />
                </S.TableCell>
                <S.TableCell>
                  <S.GoldCell>{mission.gold_reward}</S.GoldCell>
                </S.TableCell>
                <S.TableCell>
                  <S.ActionsCell>
                    <IconButton icon={Eye} onClick={() => onView(mission)} />
                    <IconButton icon={Edit} onClick={() => onEdit(mission)} />
                    <IconButton
                      icon={Trash}
                      onClick={() => onDelete(mission.id)}
                    />
                  </S.ActionsCell>
                </S.TableCell>
              </S.TableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <S.EmptyMessage>Nenhuma missão encontrada</S.EmptyMessage>
              </td>
            </tr>
          )}
        </S.TableBody>
      </S.Table>
    </S.TableWrapper>
  );
};
