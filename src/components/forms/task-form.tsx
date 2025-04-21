import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "../../schemas/task-schema";
import * as S from "./styles";
import { ITask } from "../../services/task/DTO";
import { Scroll } from "@styled-icons/fa-solid";
import { Sword } from "@styled-icons/remix-line";
import { Times } from "@styled-icons/fa-solid";
import { IconButton } from "../buttons/icon-button";

interface Props {
  task?: ITask.Model;
  onSubmit: (data: TaskFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const TaskForm = ({ task, onSubmit, onClose, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: "pending",
      experience_reward: 0,
    },
  });

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.FormHeader>
        {task ? "Editar Tarefa" : "Nova Tarefa"}
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
          <Sword size={16} /> Título da Tarefa
        </S.Label>
        <S.Input
          id="title"
          type="text"
          {...register("title")}
          placeholder="Nome da sua Tarefa"
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
        />
        {errors.description && (
          <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      {task && (
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
            : task
            ? "Atualizar Tarefa"
            : "Registrar Tarefa"}
        </S.SubmitButton>
        <S.FormSeal />
      </S.FormFooter>
    </S.FormContainer>
  );
};
