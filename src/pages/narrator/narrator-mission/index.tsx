import { useState } from "react";
import * as S from "./styles"
import { useMissions } from "../../../hooks/use-missions";
import { NarratorMissionTable } from "../../../components/tables/narrator-mission-table";
import { MissionModal } from "../../../components/modals/mission-modal";
import { IconButton } from "../../../components/buttons/icon-button";
import { Plus } from "@styled-icons/boxicons-regular";
import { ConfirmModal } from "../../components/modals/confirm-modal";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../../components/loading-spinner";

export const NarratorMissionPage = () => {
  const { missions, isLoading, createMission, updateMission, deleteMission } = useMissions();
  const [selectedMission, setSelectedMission] = useState<IMission.Model | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState<number | null>(null);

  const handleCreate = async (data: Omit<ICreateMission.Params, "token">) => {
    await createMission(data);
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (data: Omit<IUpdateMission.Params, "token">) => {
    if (!selectedMission) return;
    await updateMission({ id: selectedMission.id, ...data });
    setSelectedMission(null);
  };

  const handleDelete = async () => {
    if (!missionToDelete) return;
    const result = await deleteMission(missionToDelete);
    if (result) {
      toast.success("Missão deletada com sucesso!");
    }
    setIsDeleteModalOpen(false);
    setMissionToDelete(null);
  };

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Missões</S.Title>
        <S.Actions>
          <IconButton 
            variant="primary" 
            onClick={() => setIsCreateModalOpen(true)}
            icon={Plus} />
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
        onClose={() => setSelectedMission(null)}
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
