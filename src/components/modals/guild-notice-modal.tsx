import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  guildNoticeSchema,
  GuildNoticeFormData,
} from "../../schemas/guild-notice-schema";
import { IGuildNotice } from "../../services/guild-notice/DTO";
import { Modal } from "./modal";
import { IconButton } from "../buttons/icon-button";
import * as S from "./styles";
import { Times } from "@styled-icons/fa-solid";
import { Save, Close } from "@styled-icons/material-outlined";
import { useEffect } from "react";

interface GuildNoticeModalProps {
  initialData?: IGuildNotice.Model | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GuildNoticeFormData) => void;
  isLoading?: boolean;
}

export const GuildNoticeModal = ({
  initialData,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: GuildNoticeModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<GuildNoticeFormData>({
    resolver: zodResolver(guildNoticeSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      priority: initialData?.priority || "normal",
      active: initialData?.active ?? true,
    },
  });

  const priority = watch("priority");

  useEffect(() => {
    reset({
      title: initialData?.title || "",
      content: initialData?.content || "",
      priority: initialData?.priority || "normal",
      active: initialData?.active ?? true,
    });
  }, [initialData, reset, isOpen]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const getPriorityColor = (priority: IGuildNotice.Priority) => {
    const colors = {
      low: "#4caf50",
      normal: "#ffc107",
      high: "#fd7e14",
      critical: "#ff5252",
    };
    return colors[priority];
  };

  const getPriorityLabel = (priority: IGuildNotice.Priority) => {
    const labels = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      critical: "Crítica",
    };
    return labels[priority] || "Normal";
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.FormHeader>
          {initialData ? "Editar Notícia" : "Nova Notícia"}
          <IconButton
            icon={Times}
            onClick={handleClose}
            size="sm"
            ariaLabel="Fechar formulário"
          />
        </S.FormHeader>

        <S.InputGroup>
          <S.Label>Título *</S.Label>
          <S.Input
            type="text"
            {...register("title")}
            placeholder="Digite o título da notícia"
          />
          {errors.title && (
            <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>Conteúdo *</S.Label>
          <S.Textarea
            {...register("content")}
            placeholder="Digite o conteúdo da notícia"
            rows={6}
          />
          {errors.content && (
            <S.ErrorMessage>{errors.content.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

        <S.FormRow>
          <S.InputGroup>
            <S.Label>Prioridade</S.Label>
            <S.Select {...register("priority")}>
              <option value={"low"}>Baixa</option>
              <option value={"normal"}>Normal</option>
              <option value={"high"}>Alta</option>
              <option value={"critical"}>Crítica</option>
            </S.Select>
            <S.PriorityPreview $color={getPriorityColor(priority)}>
              {getPriorityLabel(priority)}
            </S.PriorityPreview>
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Status</S.Label>
            <S.CheckboxLabel>
              <input type="checkbox" {...register("active")} />
              <span>Notícia ativa</span>
            </S.CheckboxLabel>
          </S.InputGroup>
        </S.FormRow>

        <S.FormFooter>
          <IconButton
            icon={Close}
            variant="default"
            onClick={handleClose}
            disabled={isLoading}
            ariaLabel="Cancelar"
          />
          <IconButton
            icon={Save}
            variant="primary"
            type="submit"
            disabled={isLoading}
            ariaLabel={initialData ? "Atualizar notícia" : "Criar notícia"}
          />
        </S.FormFooter>
      </S.FormContainer>
    </Modal>
  );
};
