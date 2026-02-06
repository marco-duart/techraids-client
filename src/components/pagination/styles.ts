import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

export const PaginationButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? props.theme.accent : props.theme.primary};
  color: ${(props) => props.theme.text};
  border: 1px solid
    ${(props) =>
      props.active
        ? props.theme.accent
        : props.theme.emphasis};
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.accent};
    border-color: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.text};
  }

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const PageInfo = styled.span`
  color: ${(props) => props.theme.emphasis};
  font-size: 14px;
  margin: 0 8px;
`;