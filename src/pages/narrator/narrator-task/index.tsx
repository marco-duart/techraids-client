import { useState } from "react";
import * as S from "./styles";
import { useTasks } from "../../../hooks";
import { NarratorTaskTable } from "../../../components/tables/narrator-task-table";
import { TaskModal } from "../../../components/modals/task-modal";
import LoadingSpinner from "../../../components/loading-spinner";
import { ITask } from "../../../services/task/DTO";

export const NarratorTaskPage = () => {
  const { tasks, isLoading, updateTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState<ITask.Model | undefined>(
    undefined
  );
  const [viewingTask, setViewingTask] = useState<ITask.Model | undefined>(
    undefined
  );

  const statusToNumber = (status: string): number => {
    switch (status) {
      case "pending":
        return 0;
      case "approved":
        return 1;
      case "rejected":
        return 2;
      default:
        return 0;
    }
  };

  const handleUpdate = async (data: {
    title: string;
    description: string;
    status: "pending" | "approved" | "rejected";
    experience_reward: number;
  }) => {
    if (!selectedTask) return;
    await updateTask({
      id: selectedTask.id,
      task: {
        title: data.title,
        description: data.description,
        status: statusToNumber(data.status),
        experience_reward: data.experience_reward,
      },
    });
    setSelectedTask(undefined);
  };

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Tarefas</S.Title>
      </S.Header>

      {isLoading ? (
        <S.LoadingWrapper>
          <LoadingSpinner />
        </S.LoadingWrapper>
      ) : (
        <NarratorTaskTable
          tasks={tasks}
          onEdit={(task) => setSelectedTask(task)}
          onView={(task) => setViewingTask(task)}
        />
      )}

      <TaskModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(undefined)}
        onSubmit={handleUpdate}
        task={selectedTask}
      />

      <TaskModal
        isOpen={!!viewingTask}
        onClose={() => setViewingTask(undefined)}
        task={viewingTask}
        readOnly={true}
      />
    </S.PageContainer>
  );
};
