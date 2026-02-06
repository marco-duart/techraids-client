import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FilterSelect = styled.select`
  padding: 6px 10px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.text};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(139, 92, 246, 0.5);
  }

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(139, 92, 246, 1);
  }

  option {
    background-color: #1a1a1a;
    color: ${({ theme }) => theme.text};
  }
`;

export const FilterInput = styled.input`
  padding: 6px 10px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.text};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 13px;
  width: 80px;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.text};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(139, 92, 246, 0.5);
  }

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(139, 92, 246, 1);
  }
`;