import * as S from "./styles";

interface Props {
  status: "pending" | "approved" | "rejected";
  size?: "small" | "medium";
}

export const StatusBadge = ({ status, size = "medium" }: Props) => {
  const statusConfig = {
    pending: {
      label: "Pendente",
      color: "warning",
    },
    approved: {
      label: "Aprovado",
      color: "success",
    },
    rejected: {
      label: "Rejeitado",
      color: "danger",
    },
  };

  return (
    <S.BadgeContainer $status={status} $size={size}>
      <S.BadgeDot $status={status} />
      <S.BadgeLabel>{statusConfig[status].label}</S.BadgeLabel>
    </S.BadgeContainer>
  );
};
