import { useState } from "react";
import { ITask } from "../../services/task/DTO";
import { useTasks } from "../../hooks";
import * as S from "./styles";
import { TaskTable } from "../../components/tables/task-table";
import { TaskForm } from "../../components/forms/task-form";
import { IconButton } from "../../components/buttons/icon-button";
import { Scroll, Plus } from "@styled-icons/fa-solid";

export const TasksPage = () => {
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();

  const [selectedTask, setSelectedTask] = useState<ITask.Model | undefined>(
    undefined
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (taskData: any) => {
    if (selectedTask) {
      const success = await updateTask({
        id: selectedTask.id,
        task: taskData,
      });
      if (success) {
        setIsFormOpen(false);
        setSelectedTask(undefined);
      }
    } else {
      const success = await createTask({
        task: taskData,
      });
      if (success) {
        setIsFormOpen(false);
      }
    }
  };

  const handleForm = () => {
    setIsFormOpen(false);
    setSelectedTask(undefined);
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleContainer>
          <Scroll size={32} />
          <S.Title>Livro de Tarefas</S.Title>
        </S.TitleContainer>

        <IconButton
          variant="primary"
          onClick={() => {
            setSelectedTask(undefined);
            setIsFormOpen(true);
          }}
          icon={Plus}
        />
      </S.Header>

      <S.Content>
        <S.TableWrapper>
          <TaskTable
            tasks={tasks}
            isLoading={isLoading}
            onEdit={(task) => {
              setSelectedTask(task);
              setIsFormOpen(true);
            }}
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
              task={selectedTask}
              onSubmit={handleSubmit}
              onClose={() => handleForm()}
            />
          </S.FormContent>
        </S.FormModal>
      )}
    </S.Container>
  );
};
