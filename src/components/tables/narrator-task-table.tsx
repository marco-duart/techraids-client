import * as S from "./styles";
import { ITask } from "../../services/task/DTO";
import { StatusBadge } from "../status-badge";
import { IconButton } from "../buttons/icon-button";
import { Edit, Eye } from "@styled-icons/fa-regular";

interface Props {
  tasks: ITask.Model[];
  onEdit: (task: ITask.Model) => void;
  onView: (task: ITask.Model) => void;
  isLoading?: boolean;
}

export const NarratorTaskTable = ({
  tasks,
  onEdit,
  onView,
  isLoading = false,
}: Props) => {
  return (
    <S.NarratorTableWrapper>
      {isLoading && (
        <S.NarratorLoadingOverlay>Carregando...</S.NarratorLoadingOverlay>
      )}

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
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <S.NarratorTableRow key={task.id}>
                <S.NarratorTableCell>
                  <S.NarratorQuestTitle>{task.title}</S.NarratorQuestTitle>
                  <S.NarratorQuestDescription>
                    {task.description.substring(0, 60)}...
                  </S.NarratorQuestDescription>
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <StatusBadge status={task.status} />
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <S.NarratorXPCell>{task.experience_reward}</S.NarratorXPCell>
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <S.NarratorActionsCell>
                    <IconButton icon={Eye} onClick={() => onView(task)} />
                    {task.status === "pending" && (
                      <IconButton icon={Edit} onClick={() => onEdit(task)} />
                    )}
                  </S.NarratorActionsCell>
                </S.NarratorTableCell>
              </S.NarratorTableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <S.NarratorEmptyMessage>
                  Nenhuma tarefa encontrada
                </S.NarratorEmptyMessage>
              </td>
            </tr>
          )}
        </S.NarratorTableBody>
      </S.NarratorTable>
    </S.NarratorTableWrapper>
  );
};
