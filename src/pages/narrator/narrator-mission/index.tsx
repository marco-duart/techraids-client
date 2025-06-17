import { useState } from "react";
import * as S from "./styles";
import { useMissions } from "../../../hooks/use-missions";
import { NarratorMissionTable } from "../../../components/tables/narrator-mission-table";
import { MissionModal } from "../../../components/modals/mission-modal";
import { IconButton } from "../../../components/buttons/icon-button";
import { Plus } from "@styled-icons/boxicons-regular";
import { ConfirmModal } from "../../../components/modals/confirm-modal";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/loading-spinner";
import {
  ICreateMission,
  IMission,
  IUpdateMission,
} from "../../../services/mission/DTO";

export const NarratorMissionPage = () => {
  const { missions, isLoading, createMission, updateMission, deleteMission } =
    useMissions();
  const [selectedMission, setSelectedMission] = useState<
    IMission.Model | undefined
  >(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState<number | undefined>(
    undefined
  );

  const handleCreate = async (data: {
    title: string;
    character_id: number;
    description: string;
    status: "pending" | "approved" | "rejected";
    gold_reward: number;
  }) => {
    await createMission({
      mission: {
        title: data.title,
        description: data.description,
        status:
          data.status === "pending" ? 0 : data.status === "approved" ? 1 : 2,
        gold_reward: data.gold_reward,
        character_id: data.character_id,
      },
    });
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (data: {
    title: string;
    character_id: number;
    description: string;
    status: "pending" | "approved" | "rejected";
    gold_reward: number;
  }) => {
    if (!selectedMission) return;
    await updateMission({
      id: selectedMission.id,
      mission: {
        title: data.title,
        description: data.description,
        status:
          data.status === "pending" ? 0 : data.status === "approved" ? 1 : 2,
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
          onView={(mission) => setSelectedMission(mission)}
        />
      )}

      <MissionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
      />

      <MissionModal
        isOpen={!!selectedMission}
        onClose={() => setSelectedMission(undefined)}
        onSubmit={handleUpdate}
        mission={selectedMission}
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
