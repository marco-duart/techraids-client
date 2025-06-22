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
    <S.TableWrapper isNarrator={true}>
      <S.TableHeader>
        <h3>Prêmios</h3>
        <IconButton
          icon={Plus}
          onClick={() => onCreate(treasureChestId)}
          variant="primary"
        />
      </S.TableHeader>
      <S.Table>
        <S.TableHead>
          <tr>
            <S.TableHeader>Nome</S.TableHeader>
            <S.TableHeader>Tipo</S.TableHeader>
            <S.TableHeader>Estoque</S.TableHeader>
            <S.TableHeader>Ações</S.TableHeader>
          </tr>
        </S.TableHead>
        <S.TableBody>
          {rewards.length > 0 ? (
            rewards.map((reward) => (
              <S.TableRow key={reward.id}>
                <S.TableCell>{reward.name}</S.TableCell>
                <S.TableCell>
                  {reward.reward_type.replace(/_/g, " ")}
                </S.TableCell>
                <S.TableCell>
                  {reward.is_limited ? reward.stock_quantity : "Ilimitado"}
                </S.TableCell>
                <S.TableCell>
                  <S.ActionsCell>
                    {reward.is_limited && (
                      <>
                        <S.QuantityInput
                          type="number"
                          min="1"
                          value={restockQuantities[reward.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              reward.id,
                              parseInt(e.target.value)
                            )
                          }
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
                  </S.ActionsCell>
                </S.TableCell>
              </S.TableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <S.EmptyMessage>Nenhum prêmio encontrado</S.EmptyMessage>
              </td>
            </tr>
          )}
        </S.TableBody>
      </S.Table>
    </S.TableWrapper>
  );
};
