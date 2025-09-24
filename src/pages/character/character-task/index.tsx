import { useState } from "react";
import { useTasks } from "../../../hooks";
import * as S from "./styles";
import { TaskTable } from "../../../components/tables/task-table";
import { TaskForm } from "../../../components/forms/task-form";
import { TaskFormData } from "../../../schemas/task-schema";
import { IconButton } from "../../../components/buttons/icon-button";
import { Scroll, Plus, Refresh } from "@styled-icons/fa-solid";

export const CharacterTasksPage = () => {
  const { tasks, isLoading, createTask, deleteTask, fetchTasks } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (taskData: TaskFormData) => {
    await createTask({
      task: taskData,
    });
    handleForm(false);
  };

  const handleForm = (action: boolean) => {
    setIsFormOpen(action);
  };

  const handleRefresh = async () => {
    await fetchTasks();
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleContainer>
          <Scroll size={32} />
          <S.Title>Livro de Tarefas</S.Title>
        </S.TitleContainer>

        <S.ButtonsContainer>
          <S.RefreshIconButton 
            onClick={handleRefresh} 
            disabled={isLoading}
            title="Atualizar lista de tarefas"
          >
            <Refresh size={isLoading ? 16 : 18} />
            {isLoading && <S.LoadingSpinner />}
          </S.RefreshIconButton>

          <IconButton
            variant="primary"
            onClick={() => {
              handleForm(true);
            }}
            icon={Plus}
          />
        </S.ButtonsContainer>
      </S.Header>

      <S.Content>
        <S.TableWrapper>
          <TaskTable
            tasks={tasks}
            isLoading={isLoading}
            onDelete={deleteTask}
          />
        </S.TableWrapper>
      </S.Content>

      {isFormOpen && (
        <S.FormModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <S.FormContent
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <TaskForm
              onSubmit={handleSubmit}
              onClose={() => handleForm(false)}
            />
          </S.FormContent>
        </S.FormModal>
      )}
    </S.Container>
  );
};
