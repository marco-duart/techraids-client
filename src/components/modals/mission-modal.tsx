import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { missionSchema, MissionFormData } from "../../schemas/mission-schema";
import { IMission } from "../../services/mission/DTO";
import { Scroll, Times } from "@styled-icons/fa-solid";
import { Cancel, Save } from "@styled-icons/material";
import { Sword } from "@styled-icons/remix-line";
import { Modal } from "./modal";
import { IconButton } from "../buttons/icon-button";
import { useNarratorGuild } from "../../hooks/use-narrator-guild";
import * as S from "./styles";
import { useEffect } from "react";

interface Props {
  mission?: IMission.Model;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: MissionFormData) => void;
  isLoading?: boolean;
  readOnly?: boolean;
  resetKey?: number;
}

export const MissionModal = ({
  mission,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  readOnly,
  resetKey,
}: Props) => {
  const { guildMembers } = useNarratorGuild();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MissionFormData>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      title: mission?.title || "",
      description: mission?.description || "",
      status: mission?.status || "pending",
      gold_reward: mission?.gold_reward || 0,
      character_id: mission?.character_id || undefined,
    },
  });

  useEffect(() => {
    reset({
      title: mission?.title || "",
      description: mission?.description || "",
      status: mission?.status || "pending",
      gold_reward: mission?.gold_reward || 0,
      character_id: mission?.character_id || undefined,
    });
  }, [mission, reset, resetKey]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <S.FormContainer onSubmit={handleSubmit(onSubmit ?? (() => {}))}>
        <S.FormHeader>
          {readOnly
            ? "Visualizar Missão"
            : mission
            ? "Editar Missão"
            : "Nova Missão"}
          <IconButton
            icon={Times}
            onClick={handleClose}
            size="sm"
            ariaLabel="Fechar formulário"
            className="close-button"
          />
        </S.FormHeader>

        <S.InputGroup>
          <S.Label htmlFor="title">
            <Sword size={16} /> Título da Missão
          </S.Label>
          <S.Input
            id="title"
            type="text"
            {...register("title")}
            placeholder="Nome da Missão"
            disabled={readOnly}
          />
          {errors.title && (
            <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="description">
            <Scroll size={16} /> Descrição
          </S.Label>
          <S.Textarea
            id="description"
            {...register("description")}
            placeholder="Detalhes da Missão..."
            rows={5}
            disabled={readOnly}
          />
          {errors.description && (
            <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="gold_reward">Recompensa em Ouro</S.Label>
          <S.Input
            id="gold_reward"
            type="number"
            {...register("gold_reward", { valueAsNumber: true })}
            placeholder="Quantidade de ouro"
            disabled={readOnly}
          />
          {errors.gold_reward && (
            <S.ErrorMessage>{errors.gold_reward.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="character_id">Personagem</S.Label>
          <S.Select
            id="character_id"
            {...register("character_id", { valueAsNumber: true })}
            disabled={readOnly || !!mission}
          >
            <option value="">Selecione um personagem</option>
            {guildMembers?.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.nickname})
              </option>
            ))}
          </S.Select>
          {errors.character_id && (
            <S.ErrorMessage>{errors.character_id.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        {mission && (
          <S.InputGroup>
            <S.Label htmlFor="status">Status</S.Label>
            <S.Select id="status" {...register("status")} disabled={readOnly}>
              <option value="pending">Pendente</option>
              <option value="approved">Aprovado</option>
              <option value="rejected">Rejeitado</option>
            </S.Select>
            {errors.status && (
              <S.ErrorMessage>{errors.status.message}</S.ErrorMessage>
            )}
          </S.InputGroup>
        )}

        {!readOnly && (
          <S.FormFooter>
            <IconButton
              variant="default"
              icon={Cancel}
              onClick={handleClose}
              disabled={isLoading}
            />
            <IconButton
              variant="primary"
              icon={Save}
              type="submit"
              disabled={isLoading}
            />
          </S.FormFooter>
        )}
      </S.FormContainer>
    </Modal>
  );
};
