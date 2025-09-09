import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "../../schemas/task-schema";
import { ITask } from "../../services/task/DTO";
import { Scroll, Times } from "@styled-icons/fa-solid";
import { Sword } from "@styled-icons/remix-line";
import { Modal } from "./modal";
import { IconButton } from "../buttons/icon-button";
import { TextButton } from "../buttons/text-button";
import { useNarratorGuild } from "../../hooks";
import * as S from "./styles";
import { useEffect } from "react";

interface Props {
  task?: ITask.Model;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: TaskFormData) => void;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const TaskModal = ({
  task,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  readOnly,
}: Props) => {
  const { guildMembers } = useNarratorGuild();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "pending",
      experience_reward: task?.experience_reward || 0,
      character_id: task?.character_id || undefined,
    },
  });

  useEffect(() => {
    reset({
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "pending",
      experience_reward: task?.experience_reward || 0,
      character_id: task?.character_id || undefined,
    });
  }, [task, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <S.FormContainer onSubmit={handleSubmit(onSubmit ?? (() => {}))}>
        <S.FormHeader>
          {readOnly ? "Visualizar Tarefa" : "Editar Tarefa"}
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
            <Sword size={16} /> Título da Tarefa
          </S.Label>
          <S.Input
            id="title"
            type="text"
            {...register("title")}
            placeholder="Nome da Tarefa"
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
            placeholder="Detalhes da Tarefa..."
            rows={5}
            disabled={readOnly}
          />
          {errors.description && (
            <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="experience_reward">
            Recompensa em Experiência
          </S.Label>
          <S.Input
            id="experience_reward"
            type="number"
            {...register("experience_reward", { valueAsNumber: true })}
            placeholder="Quantidade de Experiência"
            disabled={readOnly}
          />
          {errors.experience_reward && (
            <S.ErrorMessage>{errors.experience_reward.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label htmlFor="character_id">Personagem</S.Label>
          <S.Select
            id="character_id"
            {...register("character_id", { valueAsNumber: true })}
            disabled={readOnly || !!task}
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

        {task && (
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
            <TextButton
              variant="default"
              text="Cancelar"
              onClick={handleClose}
              disabled={isLoading}
            />
            <TextButton
              variant="primary"
              text="Salvar"
              type="submit"
              disabled={isLoading}
            />
          </S.FormFooter>
        )}
      </S.FormContainer>
    </Modal>
  );
};
