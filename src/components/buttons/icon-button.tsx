import * as S from "./styles";
import { ComponentType, SVGAttributes } from "react";

interface Props {
  icon: ComponentType<SVGAttributes<SVGElement>>;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "danger";
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const IconButton = ({
  icon: Icon,
  onClick,
  size = "md",
  variant = "default",
  disabled = false,
  ariaLabel,
  className,
  type = "button",
}: Props) => {
  return (
    <S.ButtonContainer
      onClick={onClick}
      $size={size}
      $variant={variant}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      type={type}
    >
      <Icon />
    </S.ButtonContainer>
  );
};
