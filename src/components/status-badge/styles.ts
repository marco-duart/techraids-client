import styled, { css } from "styled-components";

const sizeStyles = {
  small: css`
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    gap: 0.25rem;
  `,
  medium: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    gap: 0.375rem;
  `,
};

export const BadgeContainer = styled.div<{
  $status: "pending" | "approved" | "rejected";
  $size: "small" | "medium";
}>`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background-color: ${({ theme, $status }) => theme[$status]}20;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  width: fit-content;

  ${({ $size }) => sizeStyles[$size]};
`;

export const BadgeDot = styled.span<{
  $status: "pending" | "approved" | "rejected";
}>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ theme, $status }) => theme[$status]};
`;

export const BadgeLabel = styled.span`
  white-space: nowrap;
`;
