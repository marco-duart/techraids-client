import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { missionSchema, MissionFormData } from "../../schemas/mission-schema";
import { IMission } from "../../services/mission/DTO";
import { Scroll } from "@styled-icons/fa-solid";
import { Sword } from "@styled-icons/remix-line";
import { Times } from "@styled-icons/fa-solid";
import { Modal } from "./modal";
import { IconButton } from "../buttons/icon-button";
import { useAuth } from "../../context/user-provider";
import { useCharacters } from "../../hooks/useCharacters";
import { useChapters } from "../../hooks/useChapters";
import * as S from "./styles";

interface Props {
  mission?: IMission.Model;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MissionFormData) => void;
  isLoading?: boolean;
}

export const MissionModal = ({
  mission,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: Props) => {
  const { token } = useAuth();
  const { characters } = useCharacters({ token });
  const { chapters } = useChapters({ token });

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
      chapter_id: mission?.chapter_id || undefined,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.FormHeader>
          {mission ? "Editar Missão" : "Nova Missão"}
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
          <S.Label htmlFor="gold_reward">Recompensa em Ouro</S.Label>
          <S.Input
            id="gold_reward"
            type="number"
            {...register("gold_reward", { valueAsNumber: true })}
            placeholder="Quantidade de ouro"
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
            disabled={!!mission}
          >
            <option value="">Selecione um personagem</option>
            {characters?.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name} ({character.nickname})
              </option>
            ))}
          </S.Select>
          {errors.character_id && (
            <S.ErrorMessage>{errors.character_id.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="chapter_id">Capítulo</S.Label>
          <S.Select
            id="chapter_id"
            {...register("chapter_id", { valueAsNumber: true })}
          >
            <option value="">Selecione um capítulo</option>
            {chapters?.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title}
              </option>
            ))}
          </S.Select>
          {errors.chapter_id && (
            <S.ErrorMessage>{errors.chapter_id.message}</S.ErrorMessage>
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
          <IconButton
            $variant="outline"
            type="button"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </IconButton>
          <IconButton $variant="primary" type="submit" disabled={isLoading}>
            {isLoading
              ? "Salvando..."
              : mission
              ? "Atualizar Missão"
              : "Criar Missão"}
          </IconButton>
        </S.FormFooter>
      </S.FormContainer>
    </Modal>
  );
};
