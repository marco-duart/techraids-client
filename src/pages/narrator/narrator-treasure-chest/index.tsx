import { useState } from "react";
import * as S from "./styles";
import { useTreasureChests } from "../../../hooks/use-treasure-chests";
import { TreasureChestTable } from "../../../components/tables/treasure-chest-table";
import { TreasureChestModal } from "../../../components/modals/treasure-chest-modal";
import { IconButton } from "../../../components/buttons/icon-button";
import { Plus } from "@styled-icons/boxicons-regular";
import LoadingSpinner from "../../../components/loading-spinner";
import { ITreasureChest } from "../../../services/treasure-chest/DTO";

export const NarratorTreasureChestPage = () => {
  const {
    treasureChests,
    isLoading,
    createTreasureChest,
    activateTreasureChest,
    deactivateTreasureChest,
  } = useTreasureChests();

  const [viewingTreasureChest, setViewingTreasureChest] = useState<
    ITreasureChest.Model | undefined
  >();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreate = async (data: { title: string; value: number }) => {
    const treasureChestData = {
      title: data.title,
      value: data.value,
      active: true,
    };
    await createTreasureChest({ treasure_chest: treasureChestData });
    setIsCreateModalOpen(false);
  };

  const handleToggleStatus = async (id: number, activate: boolean) => {
    if (activate) {
      await activateTreasureChest(id);
    } else {
      await deactivateTreasureChest(id);
    }
  };

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Prêmios Individuais</S.Title>
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
        <TreasureChestTable
          treasureChests={treasureChests}
          onView={(chest) => setViewingTreasureChest(chest)}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <TreasureChestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        onActivate={() => {}}
        onDeactivate={() => {}}
      />

      <TreasureChestModal
        isOpen={!!viewingTreasureChest}
        onClose={() => setViewingTreasureChest(undefined)}
        onSubmit={() => {}}
        treasureChest={viewingTreasureChest}
        onActivate={activateTreasureChest}
        onDeactivate={deactivateTreasureChest}
        readOnly
      />
    </S.PageContainer>
  );
};
