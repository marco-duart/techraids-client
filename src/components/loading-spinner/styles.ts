import styled, { keyframes } from "styled-components";
import { Spinner } from "@styled-icons/fa-solid/Spinner";
import { DEVICE } from "../../utils/constants";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;

  .book-spin {
    animation: spin 1.5s linear infinite;
    color: ${({ theme }) => theme.accent};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerIcon = styled(Spinner)`
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.primary};
  animation: ${spin} 1s linear infinite;

  @media ${DEVICE.tablet} {
    width: 2rem;
    height: 2rem;
  }
`;
