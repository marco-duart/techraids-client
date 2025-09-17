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
    <S.NarratorTableWrapper>      
      <S.NarratorTable>
        <S.NarratorTableHead>
          <tr>
            <S.NarratorTableHeader>Título</S.NarratorTableHeader>
            <S.NarratorTableHeader>Status</S.NarratorTableHeader>
            <S.NarratorTableHeader>Recompensa</S.NarratorTableHeader>
            <S.NarratorTableHeader>Ações</S.NarratorTableHeader>
          </tr>
        </S.NarratorTableHead>
        <S.NarratorTableBody>
          {missions.length > 0 ? (
            missions.map((mission) => (
              <S.NarratorTableRow key={mission.id}>
                <S.NarratorTableCell>
                  <S.NarratorQuestTitle>{mission.title}</S.NarratorQuestTitle>
                  <S.NarratorQuestDescription>
                    {mission.description.substring(0, 60)}...
                  </S.NarratorQuestDescription>
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <StatusBadge status={mission.status} />
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <S.NarratorGoldCell>{mission.gold_reward}</S.NarratorGoldCell>
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <S.NarratorActionsCell>
                    <IconButton icon={Eye} onClick={() => onView(mission)} />
                    {mission.status === "pending" && (
                      <IconButton icon={Edit} onClick={() => onEdit(mission)} />
                    )}
                    {mission.status === "pending" && (
                      <IconButton
                        icon={Trash}
                        onClick={() => onDelete(mission.id)}
                      />
                    )}
                  </S.NarratorActionsCell>
                </S.NarratorTableCell>
              </S.NarratorTableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <S.NarratorEmptyMessage>
                  Nenhuma missão encontrada
                </S.NarratorEmptyMessage>
              </td>
            </tr>
          )}
        </S.NarratorTableBody>
      </S.NarratorTable>
    </S.NarratorTableWrapper>
  );
};
