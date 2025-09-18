import { useState } from "react";
import * as S from "./styles";
import { useMissions } from "../../../hooks";
import { NarratorMissionTable } from "../../../components/tables/narrator-mission-table";
import { MissionModal } from "../../../components/modals/mission-modal";
import { IconButton } from "../../../components/buttons/icon-button";
import { Plus } from "@styled-icons/boxicons-regular";
import { ConfirmModal } from "../../../components/modals/confirm-modal";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/loading-spinner";
import { IMission } from "../../../services/mission/DTO";

export const NarratorMissionPage = () => {
  const { missions, isLoading, createMission, updateMission, deleteMission } =
    useMissions();
  const [selectedMission, setSelectedMission] = useState<
    IMission.Model | undefined
  >(undefined);
  const [viewingMission, setViewingMission] = useState<
    IMission.Model | undefined
  >(undefined);
  const [createModalKey, setCreateModalKey] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState<number | undefined>(
    undefined
  );

  const handleCreate = async (data: {
    title: string;
    character_id: number;
    description: string;
    status: IMission.Status;
    gold_reward: number;
  }) => {
    await createMission({
      mission: {
        title: data.title,
        description: data.description,
        status: data.status,
        gold_reward: data.gold_reward,
        character_id: data.character_id,
      },
    });
    setIsCreateModalOpen(false);
    setCreateModalKey((prev) => prev + 1);
  };

  const handleUpdate = async (data: {
    title: string;
    description: string;
    status: IMission.Status;
    gold_reward: number;
  }) => {
    if (!selectedMission) return;
    await updateMission({
      id: selectedMission.id,
      mission: {
        title: data.title,
        description: data.description,
        status: data.status,
        gold_reward: data.gold_reward,
      },
    });
    setSelectedMission(undefined);
  };

  const handleDelete = async () => {
    if (!missionToDelete) return;
    const result = await deleteMission(missionToDelete);
    if (result) {
      toast.success("Missão deletada com sucesso!");
    }
    setIsDeleteModalOpen(false);
    setMissionToDelete(undefined);
  };

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Missões</S.Title>
        <S.Actions>
          <IconButton
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            icon={Plus}
          />
        </S.Actions>
      </S.Header>

      {isLoading ? (
        <S.LoadingWrapper>
          <LoadingSpinner />
        </S.LoadingWrapper>
      ) : (
        <NarratorMissionTable
          missions={missions}
          onEdit={(mission) => setSelectedMission(mission)}
          onDelete={(id) => {
            setMissionToDelete(id);
            setIsDeleteModalOpen(true);
          }}
          onView={(mission) => setViewingMission(mission)}
        />
      )}

      <MissionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        resetKey={createModalKey}
      />

      <MissionModal
        isOpen={!!selectedMission}
        onClose={() => setSelectedMission(undefined)}
        onSubmit={handleUpdate}
        mission={selectedMission}
      />

      <MissionModal
        isOpen={!!viewingMission}
        onClose={() => setViewingMission(undefined)}
        mission={viewingMission}
        readOnly={true}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message="Tem certeza que deseja deletar esta missão?"
      />
    </S.PageContainer>
  );
};
