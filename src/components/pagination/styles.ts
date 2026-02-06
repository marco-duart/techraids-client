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
    props.active ? "rgba(139, 92, 246, 0.8)" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.active ? "#fff" : "rgba(255, 255, 255, 0.7)")};
  border: 1px solid
    ${(props) =>
      props.active
        ? "rgba(139, 92, 246, 1)"
        : "rgba(255, 255, 255, 0.1)"};
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;

  &:hover:not(:disabled) {
    background-color: rgba(139, 92, 246, 0.9);
    border-color: rgba(139, 92, 246, 1);
    color: #fff;
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
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0 8px;
`;