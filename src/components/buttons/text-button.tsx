import * as S from "./styles";

interface Props {
  text: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "danger";
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const TextButton = ({
  text,
  onClick,
  variant = "default",
  disabled = false,
  ariaLabel,
  className,
  type = "button",
}: Props) => {
  return (
    <S.TextButtonContainer
      onClick={onClick}
      $variant={variant}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      type={type}
    >
      {text}
    </S.TextButtonContainer>
  );
};
