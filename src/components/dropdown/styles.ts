import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  font-family: "MedievalSharp", cursive;
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.accent};
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.emphasis};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const DropdownArrow = styled.span<{ $isOpen: boolean }>`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${({ theme }) => theme.text};
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ theme }) => theme.accent};
  border-radius: 8px;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const DropdownItem = styled.li<{ $isSelected: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.emphasis : "transparent"};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.textTitle : theme.text};

  &:hover {
    background: ${({ theme }) => theme.emphasis};
  }
`;
