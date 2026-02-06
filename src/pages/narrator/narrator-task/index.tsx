import { useState } from "react";
import * as S from "./styles";
import { useTasks } from "../../../hooks";
import { NarratorTaskTable } from "../../../components/tables/narrator-task-table";
import { TaskModal } from "../../../components/modals/task-modal";
import { Pagination } from "../../../components/pagination";
import { TaskFilters } from "../../../components/task-filters";
import LoadingSpinner from "../../../components/loading-spinner";
import { ITask } from "../../../services/task/DTO";

export const NarratorTaskPage = () => {
  const {
    tasks,
    pagy,
    isLoading,
    updateTask,
    setStatus,
    setExperienceRewardRange,
    setSortBy,
    goToPage,
  } = useTasks();
  const [selectedTask, setSelectedTask] = useState<ITask.Model | undefined>(
    undefined
  );
  const [viewingTask, setViewingTask] = useState<ITask.Model | undefined>(
    undefined
  );

  const handleUpdate = async (data: {
    title: string;
    description: string;
    status: ITask.Status;
    experience_reward: number;
  }) => {
    if (!selectedTask) return;
    await updateTask({
      id: selectedTask.id,
      task: {
        title: data.title,
        description: data.description,
        status: data.status,
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

      <TaskFilters
        onStatusChange={setStatus}
        onRewardRangeChange={setExperienceRewardRange}
        onSortChange={(sortBy, direction) =>
          setSortBy(
            sortBy as "status" | "experience_reward" | "created_at" | "updated_at",
            direction
          )
        }
      />

      {isLoading ? (
        <S.LoadingWrapper>
          <LoadingSpinner />
        </S.LoadingWrapper>
      ) : (
        <>
          <NarratorTaskTable
            isLoading={isLoading}
            tasks={tasks}
            onEdit={(task) => setSelectedTask(task)}
            onView={(task) => setViewingTask(task)}
          />

          {pagy.pages > 1 && (
            <Pagination
              currentPage={pagy.page}
              totalPages={pagy.pages}
              onPageChange={goToPage}
              isLoading={isLoading}
            />
          )}
        </>
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
