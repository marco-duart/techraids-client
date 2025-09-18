import * as S from "./styles";
import { ITreasureChest } from "../../services/treasure-chest/DTO";
import { IconButton } from "../buttons/icon-button";
import { Eye } from "@styled-icons/fa-regular";
import { ToggleOn, ToggleOff } from "@styled-icons/material";
import { useState } from "react";

interface Props {
  treasureChests: ITreasureChest.Model[];
  onView: (treasureChest: ITreasureChest.Model) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
  isLoading?: boolean;
}

export const TreasureChestTable = ({
  treasureChests,
  onView,
  onToggleStatus,
  isLoading = false,
}: Props) => {
  const [isToggling, setIsToggling] = useState<Record<number, boolean>>({});

  const handleToggle = async (id: number, isActive: boolean) => {
    setIsToggling((prev) => ({ ...prev, [id]: true }));
    try {
      await onToggleStatus(id, isActive);
    } finally {
      setIsToggling((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <S.NarratorTableWrapper>
      {isLoading && (
        <S.NarratorLoadingOverlay>Carregando...</S.NarratorLoadingOverlay>
      )}

      <S.NarratorTable>
        <S.NarratorTableHead>
          <tr>
            <S.NarratorTableHeader>Título</S.NarratorTableHeader>
            <S.NarratorTableHeader>Valor</S.NarratorTableHeader>
            <S.NarratorTableHeader>Status</S.NarratorTableHeader>
            <S.NarratorTableHeader>Ações</S.NarratorTableHeader>
          </tr>
        </S.NarratorTableHead>
        <S.NarratorTableBody>
          {treasureChests.length > 0 ? (
            treasureChests.map((chest) => (
              <S.NarratorTableRow key={chest.id}>
                <S.NarratorTableCell>
                  <S.NarratorQuestTitle>{chest.title}</S.NarratorQuestTitle>
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <S.NarratorGoldCell>{chest.value}</S.NarratorGoldCell>
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <div
                    style={{
                      color: chest.active ? "#4caf50" : "#f44336",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {isToggling[chest.id] ? (
                      <span>Carregando...</span>
                    ) : (
                      <>
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: chest.active
                              ? "#4caf50"
                              : "#f44336",
                          }}
                        />
                        {chest.active ? "Habilitado" : "Desabilitado"}
                      </>
                    )}
                  </div>
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <S.NarratorActionsCell>
                    <IconButton
                      icon={chest.active ? ToggleOn : ToggleOff}
                      onClick={() => handleToggle(chest.id, !chest.active)}
                      variant={chest.active ? "default" : "danger"}
                    />
                    <IconButton icon={Eye} onClick={() => onView(chest)} />
                  </S.NarratorActionsCell>
                </S.NarratorTableCell>
              </S.NarratorTableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <S.NarratorEmptyMessage>
                  Nenhum baú de tesouro encontrado
                </S.NarratorEmptyMessage>
              </td>
            </tr>
          )}
        </S.NarratorTableBody>
      </S.NarratorTable>
    </S.NarratorTableWrapper>
  );
};
