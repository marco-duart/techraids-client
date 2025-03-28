import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { missionSchema, MissionFormData } from "../../schemas/mission-schema";
import * as S from "./styles";
import { IMission } from "../../services/mission/DTO";
import { Scroll } from "@styled-icons/fa-solid";
import { Sword, Coins } from "@styled-icons/remix-line";
import { Times } from "@styled-icons/fa-solid";
import { IconButton } from "../buttons/icon-button";

interface Props {
  mission?: IMission.Model;
  onSubmit: (data: MissionFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const MissionForm = ({ mission, onSubmit, onClose, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MissionFormData>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      title: mission?.title || "",
      description: mission?.description || "",
      status: mission?.status || "pending",
      gold_reward: mission?.gold_reward || 0,
    },
  });

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.FormHeader>
        {mission ? "Editar Missão" : "Nova Missão"}
        <IconButton
          icon={Times}
          onClick={onClose}
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
          placeholder="Nome da sua Missão"
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
        />
        {errors.description && (
          <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label htmlFor="gold_reward">
          <Coins size={16} /> Recompensa (XP)
        </S.Label>
        <S.Input
          id="gold_reward"
          type="number"
          {...register("gold_reward", { valueAsNumber: true })}
          placeholder="0"
        />
        {errors.gold_reward && (
          <S.ErrorMessage>{errors.gold_reward.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      {mission && (
        <S.InputGroup>
          <S.Label htmlFor="status">Status</S.Label>
          <S.Select id="status" {...register("status")}>
            <option value="pending">Pendente</option>
            <option value="approved">Aprovado</option>
            <option value="rejected">Rejeitado</option>
          </S.Select>
          {errors.status && (
            <S.ErrorMessage>{errors.status.message}</S.ErrorMessage>
          )}
        </S.InputGroup>
      )}

      <S.FormFooter>
        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading
            ? "Gravando..."
            : mission
            ? "Atualizar Missão"
            : "Registrar Missão"}
        </S.SubmitButton>
        <S.FormSeal />
      </S.FormFooter>
    </S.FormContainer>
  );
};
