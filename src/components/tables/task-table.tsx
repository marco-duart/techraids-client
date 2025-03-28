import { ITask } from "../../services/task/DTO";
import * as S from "./styles";
import { StatusBadge } from "../status-badge";
import { IconButton } from "../buttons/icon-button";
import { Edit, Trash } from "@styled-icons/boxicons-regular";

interface Props {
  tasks: ITask.Model[];
  onEdit?: (task: ITask.Model) => void;
  onDelete?: (id: number) => void;
  isLoading?: boolean;
}

export const TaskTable = ({ tasks, onEdit, onDelete, isLoading }: Props) => {
  return (
    <S.TableWrapper>
      {isLoading && <S.LoadingOverlay>Carregando Missões...</S.LoadingOverlay>}

      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeader>Tarefa</S.TableHeader>
            <S.TableHeader>Estado</S.TableHeader>
            <S.TableHeader>Recompensa</S.TableHeader>
            {(onEdit || onDelete) && <S.TableHeader>Ações</S.TableHeader>}
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {tasks.map((task) => (
            <S.TableRow key={task.id}>
              <S.TableCell>
                <S.QuestTitle>{task.title}</S.QuestTitle>
                {task.description && (
                  <S.QuestDescription>{task.description}</S.QuestDescription>
                )}
              </S.TableCell>

              <S.TableCell>
                <StatusBadge status={task.status} />
              </S.TableCell>

              <S.TableCell>
                <S.XPCell>{task.experience_reward || 0}</S.XPCell>
              </S.TableCell>

              {(onEdit || onDelete) && (
                <S.TableCell>
                  <S.ActionsCell>
                    {onEdit && (
                      <IconButton
                        icon={Edit}
                        onClick={() => onEdit(task)}
                        size="md"
                        variant="default"
                        ariaLabel={`Editar ${task.title}`}
                      />
                    )}
                    {onDelete && (
                      <IconButton
                        icon={Trash}
                        onClick={() => onDelete(task.id)}
                        size="md"
                        variant="danger"
                        ariaLabel={`Excluir ${task.title}`}
                      />
                    )}
                  </S.ActionsCell>
                </S.TableCell>
              )}
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>

      {!isLoading && tasks.length === 0 && (
        <S.EmptyMessage>
          Nenhuma tarefa encontrada no grimório...
        </S.EmptyMessage>
      )}
    </S.TableWrapper>
  );
};
