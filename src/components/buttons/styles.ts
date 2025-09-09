import styled, { css } from "styled-components";

const sizeStyles = {
  sm: css`
    width: 1.75rem;
    height: 1.75rem;
    padding: 0.25rem;
  `,
  md: css`
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.5rem;
  `,
  lg: css`
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.75rem;
  `,
};

const variantStyles = {
  default: css`
    color: ${({ theme }) => theme.text};
    background: transparent;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.accent};
      background: ${({ theme }) => theme.accent}15;
    }
  `,
  primary: css`
    color: ${({ theme }) => theme.textTitle};
    background: ${({ theme }) => theme.accent}30;
    border: 1px solid ${({ theme }) => theme.accent}50;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.accent}50;
    }
  `,
  danger: css`
    color: ${({ theme }) => theme.rejected};
    background: ${({ theme }) => theme.rejected}15;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.rejected}25;
    }
  `,
};

export const ButtonContainer = styled.button<{
  $size: "sm" | "md" | "lg";
  $variant: "default" | "primary" | "danger";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  position: relative;
  overflow: hidden;

  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};

  svg {
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease;
  }

  &:hover:not(:disabled) {
    svg {
      transform: scale(1.1);
    }
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.text}10;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover:not(:disabled)::after {
    opacity: 1;
  }

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1);
`;

export const TextButtonContainer = styled.button<{
  $variant: "default" | "primary" | "danger";
}>`
  display: inline-flex;
  width: auto;
  height: 2rem;
  padding: 0 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  position: relative;
  overflow: hidden;

  ${({ $variant }) => variantStyles[$variant]};

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.text}10;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover:not(:disabled)::after {
    opacity: 1;
  }

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1);
`;
