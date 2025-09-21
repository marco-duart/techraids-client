import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BossFormData, bossSchema } from "../../schemas/boss-schema";
import { Modal } from "./modal";
import { IconButton } from "../buttons/icon-button";
import * as S from "./styles";
import { Times } from "@styled-icons/fa-solid";
import { Save, Close } from "@styled-icons/material-outlined";
import { useEffect } from "react";
import { IBoss } from "../../services/boss/DTO";

interface BossModalProps {
  initialData?: IBoss.Model | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BossFormData) => void;
  isLoading?: boolean;
}

export const BossModal = ({
  initialData,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: BossModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BossFormData>({
    resolver: zodResolver(bossSchema),
    defaultValues: {
      reward_description: initialData?.reward_description || "",
    },
  });

  useEffect(() => {
    reset({
      reward_description: initialData?.reward_description || "",
    });
  }, [initialData, reset, isOpen]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.FormHeader>
          {initialData ? `Editar Boss - ${initialData.name}` : "Novo Boss"}
          <IconButton
            icon={Times}
            onClick={handleClose}
            size="sm"
            ariaLabel="Fechar formulário"
          />
        </S.FormHeader>

        {initialData && (
          <>
            <S.InputGroup>
              <S.Label>Nome</S.Label>
              <S.Input
                type="text"
                value={initialData.name}
                disabled
                placeholder="Nome do boss"
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Slogan</S.Label>
              <S.Input
                type="text"
                value={initialData.slogan}
                disabled
                placeholder="Slogan do boss"
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Descrição</S.Label>
              <S.Textarea
                value={initialData.description}
                disabled
                placeholder="Descrição do boss"
                rows={4}
              />
            </S.InputGroup>
          </>
        )}

        <S.InputGroup>
          <S.Label>Descrição da Recompensa *</S.Label>
          <S.Textarea
            {...register("reward_description")}
            placeholder="Descreva a recompensa para derrotar este boss"
            rows={4}
          />
          {errors.reward_description && (
            <S.ErrorMessage>{errors.reward_description.message}</S.ErrorMessage>
          )}
        </S.InputGroup>

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
            ariaLabel={initialData ? "Atualizar boss" : "Criar boss"}
          />
        </S.FormFooter>
      </S.FormContainer>
    </Modal>
  );
};
