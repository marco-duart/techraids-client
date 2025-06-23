import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  treasureChestSchema,
  TreasureChestFormData,
} from "../../schemas/treasure-chest-schema";
import { ITreasureChest } from "../../services/treasure-chest/DTO";
import { Modal } from "./modal";
import { IconButton } from "../buttons/icon-button";
import * as S from "./styles";
import { Times, Check, Ban } from "@styled-icons/fa-solid";
import { Save, Close } from "@styled-icons/material-outlined";
import { RewardTable } from "../tables/reward-table";
import { useRewards } from "../../hooks";
import { useEffect, useState } from "react";
import { RewardModal } from "./reward-modal";
import { IReward } from "../../services/reward/DTO";
import { RewardFormData } from "../../schemas/reward-schema";

interface Props {
  treasureChest?: ITreasureChest.Model;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TreasureChestFormData) => void;
  onActivate: (id: number) => void;
  onDeactivate: (id: number) => void;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const TreasureChestModal = ({
  treasureChest,
  isOpen,
  onClose,
  onSubmit,
  onActivate,
  onDeactivate,
  isLoading,
  readOnly,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TreasureChestFormData>({
    resolver: zodResolver(treasureChestSchema),
    defaultValues: {
      title: treasureChest?.title || "",
      value: treasureChest?.value || 0,
      active: treasureChest?.active || true,
    },
  });

  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<
    IReward.Model | undefined
  >(undefined);

  const {
    rewards,
    createReward,
    restockReward,
    removeRewardStock,
  } = useRewards({ treasure_chest_id: treasureChest?.id || 0 });

  useEffect(() => {
    if (treasureChest) {
      reset({
        title: treasureChest.title,
        value: treasureChest.value,
        active: treasureChest.active,
      });
    }
  }, [treasureChest, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleRewardSubmit = (data: RewardFormData) => {
    const rewardData = {
      name: data.name,
      description: data.description,
      reward_type: convertRewardTypeToNumber(data.reward_type),
      is_limited: data.is_limited,
      stock_quantity: data.is_limited ? data.stock_quantity : 0,
      treasure_chest_id: treasureChest?.id || 0,
    };

    createReward({ reward: rewardData });
    setIsRewardModalOpen(false);
  };

  const convertRewardTypeToNumber = (type: string): number => {
    switch (type) {
      case "physical_item":
        return 0;
      case "digital_content":
        return 1;
      case "in_game_benefit":
        return 2;
      case "real_life_experience":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.FormHeader>
          {readOnly
            ? "Visualizar Baú"
            : treasureChest
            ? "Editar Baú"
            : "Novo Baú"}
          <IconButton
            icon={Times}
            onClick={handleClose}
            size="sm"
            ariaLabel="Fechar formulário"
            className="close-button"
          />
        </S.FormHeader>

        <S.InputGroup>
          <S.Label>Título</S.Label>
          <S.Input
            type="text"
            {...register("title")}
            placeholder="Título do Baú"
            disabled={readOnly}
          />
          {errors.title && (
            <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>Valor</S.Label>
          <S.Input
            type="number"
            {...register("value", { valueAsNumber: true })}
            placeholder="Valor do Baú"
            disabled={readOnly}
          />
          {errors.value && (
            <S.ErrorMessage>{errors.value.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        {treasureChest && (
          <>
            <S.StatusActions>
              <IconButton
                icon={Check}
                onClick={() => onActivate(treasureChest.id)}
                disabled={treasureChest.active || isLoading}
                variant="default"
              />
              <IconButton
                icon={Ban}
                onClick={() => onDeactivate(treasureChest.id)}
                disabled={!treasureChest.active || isLoading}
                variant="danger"
              />
            </S.StatusActions>

            <RewardTable
              rewards={rewards}
              treasureChestId={treasureChest.id}
              onCreate={() => {
                setSelectedReward(undefined);
                setIsRewardModalOpen(true);
              }}
              onRestock={restockReward}
              onRemoveStock={removeRewardStock}
            />
          </>
        )}

        {!readOnly && (
          <S.FormFooter>
            <IconButton
              icon={Close}
              variant="default"
              onClick={handleClose}
              disabled={isLoading}
            />
            <IconButton
              icon={Save}
              variant="primary"
              type="submit"
              disabled={isLoading}
            />
          </S.FormFooter>
        )}
      </S.FormContainer>

      <RewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        onSubmit={handleRewardSubmit}
        reward={selectedReward}
        treasureChestId={treasureChest?.id}
      />
    </Modal>
  );
};
