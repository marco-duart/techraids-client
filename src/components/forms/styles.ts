import styled from "styled-components";
import { DEVICE } from "../../utils/constants";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  max-width: 400px;
  margin: 0 auto;

  @media ${DEVICE.tablet} {
    padding: 2rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 0.875rem;
  margin: 0;
`;

export const SuccessMessage = styled.p`
  color: #4caf50;
  font-size: 0.875rem;
  margin: 0;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accent}90;
  }
`;

export const CharacterFormContainer = styled(FormContainer)`
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;
