import styled from "styled-components";

export const FiltersContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

export const DateFilterButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.primary};
  }
`;

export const DatePickerContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
  margin-top: 0.5rem;
`;

export const DatePickerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ApplyButton = styled.button`
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.primary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;