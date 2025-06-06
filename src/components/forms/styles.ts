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
  color: ${({ theme }) => theme.rejected};
  font-size: 0.875rem;
  margin: 0;
`;

export const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.approved};
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

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;

  .close-button {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 0;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  resize: vertical;
  min-height: 120px;
  font-family: "Book Antiqua", serif;
  letter-spacing: 0.5px;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accent}40;
  }
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 0;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-family: "MedievalSharp", cursive;
  letter-spacing: 0.5px;
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accent}40;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const FormSeal = styled.div`
  width: 60px;
  height: 60px;
  opacity: 0.7;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

export const InputIconWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
  }
`;

export const PasswordSection = styled.section`
  background: ${({ theme }) => theme.secondary};
  border: 3px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const PasswordHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed ${({ theme }) => theme.border};
`;

export const PasswordTitle = styled.h2`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textTitle};
`;

export const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.textTitle};
`;

export const FormInput = styled.input`
  padding: 0.75rem;
  background: ${({ theme }) => theme.primary}10;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
  font-family: "Book Antiqua", serif;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accent}40;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PasswordSubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.textTitle};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PasswordErrorMessage = styled.span`
  color: ${({ theme }) => theme.error};
  font-size: 0.8rem;
  margin-top: 0.25rem;
  font-family: "Book Antiqua", serif;
`;
