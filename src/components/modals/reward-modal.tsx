import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rewardSchema, RewardFormData } from "../../schemas/reward-schema";
import { IReward } from "../../services/reward/DTO";
import { Modal } from "./modal";
import { IconButton } from "../buttons/icon-button";
import * as S from "./styles";
import { Times } from "@styled-icons/fa-solid";
import { Save, Close } from "@styled-icons/material-outlined";
import { useEffect } from "react";

interface Props {
  reward?: IReward.Model;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RewardFormData) => void;
  isLoading?: boolean;
  treasureChestId?: number;
}

export const RewardModal = ({
  reward,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  treasureChestId,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RewardFormData>({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      name: reward?.name || "",
      description: reward?.description || "",
      reward_type: reward?.reward_type || "physical_item",
      is_limited: reward?.is_limited || false,
      stock_quantity: reward?.stock_quantity || 0,
    },
  });

  const isLimited = watch("is_limited");

  useEffect(() => {
    reset({
      name: reward?.name || "",
      description: reward?.description || "",
      reward_type: reward?.reward_type || "physical_item",
      is_limited: reward?.is_limited || false,
      stock_quantity: reward?.stock_quantity || 0,
      treasure_chest_id: treasureChestId || reward?.treasure_chest_id
    });
  }, [reward, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.FormHeader>
          {reward ? "Editar Prêmio" : "Novo Prêmio"}
          <IconButton
            icon={Times}
            onClick={handleClose}
            size="sm"
            ariaLabel="Fechar formulário"
          />
        </S.FormHeader>

        <S.InputGroup>
          <S.Label>Nome</S.Label>
          <S.Input
            type="text"
            {...register("name")}
            placeholder="Nome do prêmio"
          />
          {errors.name && (
            <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>Descrição</S.Label>
          <S.Textarea
            {...register("description")}
            placeholder="Descrição do prêmio"
            rows={3}
          />
          {errors.description && (
            <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>Tipo</S.Label>
          <S.Select {...register("reward_type")}>
            <option value="physical_item">Item Físico</option>
            <option value="digital_content">Conteúdo Digital</option>
            <option value="in_game_benefit">Benefício no Jogo</option>
            <option value="real_life_experience">Experiência Real</option>
          </S.Select>
        </S.InputGroup>

        <S.InputGroup>
          <S.CheckboxLabel>
            <input type="checkbox" {...register("is_limited")} />
            <span>Possui quantidade limitada?</span>
          </S.CheckboxLabel>
        </S.InputGroup>

        {isLimited && (
          <S.InputGroup>
            <S.Label>Quantidade em Estoque</S.Label>
            <S.Input
              type="number"
              {...register("stock_quantity", { valueAsNumber: true })}
              min="0"
            />
            {errors.stock_quantity && (
              <S.ErrorMessage>{errors.stock_quantity.message}</S.ErrorMessage>
            )}
          </S.InputGroup>
        )}

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
      </S.FormContainer>
    </Modal>
  );
};
