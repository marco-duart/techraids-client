import * as S from "./styles";
import { ITask } from "../../services/task/DTO";
import { StatusBadge } from "../status-badge";
import { IconButton } from "../buttons/icon-button";
import { Edit, Eye } from "@styled-icons/fa-regular";

interface Props {
  tasks: ITask.Model[];
  onEdit: (task: ITask.Model) => void;
  onView: (task: ITask.Model) => void;
}

export const NarratorTaskTable = ({ tasks, onEdit, onView }: Props) => {
  return (
    <S.TableWrapper isNarrator={true}>
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
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <S.TableRow key={task.id}>
                <S.TableCell>
                  <S.QuestTitle>{task.title}</S.QuestTitle>
                  <S.QuestDescription>
                    {task.description.substring(0, 60)}...
                  </S.QuestDescription>
                </S.TableCell>
                <S.TableCell>
                  <StatusBadge status={task.status} />
                </S.TableCell>
                <S.TableCell>
                  <S.XPCell>{task.experience_reward}</S.XPCell>
                </S.TableCell>
                <S.TableCell>
                  <S.ActionsCell>
                    <IconButton icon={Eye} onClick={() => onView(task)} />
                    {task.status === ITask.Status.PENDING && (
                      <IconButton icon={Edit} onClick={() => onEdit(task)} />
                    )}
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
