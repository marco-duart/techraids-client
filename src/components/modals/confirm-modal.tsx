import { Modal } from "./modal";
import { Save, Close } from "@styled-icons/material-outlined";
import { IconButton } from "../buttons/icon-button";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: Props) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.FormContainer>
        <S.FormHeader>{title}</S.FormHeader>
        <p>{message}</p>
        <S.FormFooter>
          <IconButton
            variant="primary"
            icon={Close}
            onClick={onClose}
            disabled={isLoading}
          />
          <IconButton
            variant="primary"
            icon={Save}
            onClick={handleConfirm}
            disabled={isLoading}
          />
        </S.FormFooter>
      </S.FormContainer>
    </Modal>
  );
};
