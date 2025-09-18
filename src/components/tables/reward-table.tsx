import * as S from "./styles";
import { IRestockReward, IReward } from "../../services/reward/DTO";
import { IconButton } from "../buttons/icon-button";
import { Plus, Minus } from "@styled-icons/fa-solid";
import { useState } from "react";

interface Props {
  rewards: IReward.Model[];
  treasureChestId: number;
  onCreate: (treasureChestId: number) => void;
  onRestock: (data: Omit<IRestockReward.Params, "token">) => void;
  onRemoveStock: (id: number) => void;
}

export const RewardTable = ({
  rewards,
  treasureChestId,
  onCreate,
  onRestock,
  onRemoveStock,
}: Props) => {
  const [restockQuantities, setRestockQuantities] = useState<
    Record<number, number>
  >({});

  const handleQuantityChange = (id: number, value: number) => {
    setRestockQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <S.NarratorTableWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h3 style={{ color: "#333", margin: 0 }}>Prêmios</h3>
        <IconButton
          icon={Plus}
          onClick={() => onCreate(treasureChestId)}
          variant="primary"
        />
      </div>

      <S.NarratorTable>
        <S.NarratorTableHead>
          <tr>
            <S.NarratorTableHeader>Nome</S.NarratorTableHeader>
            <S.NarratorTableHeader>Tipo</S.NarratorTableHeader>
            <S.NarratorTableHeader>Estoque</S.NarratorTableHeader>
            <S.NarratorTableHeader>Ações</S.NarratorTableHeader>
          </tr>
        </S.NarratorTableHead>
        <S.NarratorTableBody>
          {rewards.length > 0 ? (
            rewards.map((reward) => (
              <S.NarratorTableRow key={reward.id}>
                <S.NarratorTableCell>{reward.name}</S.NarratorTableCell>
                <S.NarratorTableCell>
                  {reward.reward_type.replace(/_/g, " ")}
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  {reward.is_limited ? reward.stock_quantity : "Ilimitado"}
                </S.NarratorTableCell>
                <S.NarratorTableCell>
                  <S.NarratorActionsCell>
                    {reward.is_limited && (
                      <>
                        <input
                          type="number"
                          min="1"
                          value={restockQuantities[reward.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              reward.id,
                              parseInt(e.target.value)
                            )
                          }
                          style={{
                            width: "60px",
                            padding: "0.25rem",
                            marginRight: "0.5rem",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                          }}
                        />
                        <IconButton
                          icon={Plus}
                          onClick={() =>
                            onRestock({
                              id: reward.id,
                              quantity: restockQuantities[reward.id] || 1,
                            })
                          }
                          variant="default"
                        />
                        <IconButton
                          icon={Minus}
                          onClick={() => onRemoveStock(reward.id)}
                          variant="danger"
                        />
                      </>
                    )}
                  </S.NarratorActionsCell>
                </S.NarratorTableCell>
              </S.NarratorTableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <S.NarratorEmptyMessage>
                  Nenhum prêmio encontrado
                </S.NarratorEmptyMessage>
              </td>
            </tr>
          )}
        </S.NarratorTableBody>
      </S.NarratorTable>
    </S.NarratorTableWrapper>
  );
};
