import { useState } from "react";
import { IMission } from "../../services/mission/DTO";
import { useMissions } from "../../hooks";
import * as S from "./styles";
import { MissionTable } from "../../components/tables/mission-table";
import { MissionForm } from "../../components/forms/mission-form";
import { IconButton } from "../../components/buttons/icon-button";
import { Scroll, Plus } from "@styled-icons/fa-solid";

export const MissionsPage = () => {
  const { missions, isLoading, createMission, updateMission, deleteMission } =
    useMissions();

  const [selectedMission, setSelectedMission] = useState<
    IMission.Model | undefined
  >(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (missionData: any) => {
    if (selectedMission) {
      const success = await updateMission({
        id: selectedMission.id,
        mission: missionData,
      });
      if (success) {
        setIsFormOpen(false);
        setSelectedMission(undefined);
      }
    } else {
      const success = await createMission({
        mission: missionData,
      });
      if (success) {
        setIsFormOpen(false);
      }
    }
  };

  const handleForm = () => {
    setIsFormOpen(false);
    setSelectedMission(undefined);
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleContainer>
          <Scroll size={32} />
          <S.Title>Livro de Missões</S.Title>
        </S.TitleContainer>

        <IconButton
          variant="primary"
          onClick={() => {
            setSelectedMission(undefined);
            setIsFormOpen(true);
          }}
          icon={Plus}
        />
      </S.Header>

      <S.Content>
        <S.TableWrapper>
          <MissionTable
            missions={missions}
            isLoading={isLoading}
            onEdit={(mission) => {
              setSelectedMission(mission);
              setIsFormOpen(true);
            }}
            onDelete={deleteMission}
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
            <MissionForm
              mission={selectedMission}
              onSubmit={handleSubmit}
              onClose={() => handleForm()}
            />
          </S.FormContent>
        </S.FormModal>
      )}
    </S.Container>
  );
};
